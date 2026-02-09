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
  "Mental Health Fundamentals",
  "Depression, Anxiety & Stress",
  "Substance Misuse, Self-Harm & Suicide",
  "Psychosis, Eating Disorders & Complex Needs",
  "Workplace Implementation & Wellbeing"
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
  categories: mentalHealthCategories
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
    question: "According to the World Health Organisation (WHO), mental health is defined as:",
    options: [
      "A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community",
      "The absence of any mental illness or psychological disorder",
      "A condition where an individual feels happy and content at all times",
      "The ability to function without any emotional distress or difficulty",
    ] as const,
    correctAnswer: 0,
    explanation:
      "The WHO defines mental health as 'a state of well-being in which every individual realises his or her own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to his or her community.' This definition emphasises that mental health is more than just the absence of illness.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Mental health definition (WHO)",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 2,
    question:
      "Approximately what proportion of people will experience a mental health problem in any given year?",
    options: ["1 in 2", "1 in 4", "1 in 10", "1 in 20"] as const,
    correctAnswer: 1,
    explanation:
      "According to established UK statistics, approximately 1 in 4 people will experience a mental health problem in any given year. This widely cited figure highlights just how common mental health difficulties are and underscores the importance of mental health awareness and support in every workplace and community.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Prevalence statistics",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 3,
    question: "What does the acronym ALGEE stand for in the MHFA action plan?",
    options: [
      "Assess, Listen, Give, Encourage professional help, Encourage other supports",
      "Approach, Listen, Give reassurance and information, Encourage appropriate professional help, Encourage other supports",
      "Ask, Learn, Guide, Enable professional help, Enable other supports",
      "Approach, Lead, Give advice, Ensure professional help, Ensure other supports",
    ] as const,
    correctAnswer: 1,
    explanation:
      "ALGEE stands for: Approach, assess and assist with any crisis; Listen non-judgementally; Give reassurance and information; Encourage appropriate professional help; Encourage other supports. This is the core action plan taught in Mental Health First Aid training.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "ALGEE action plan",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 4,
    question: "Which of the following is a common myth about mental health?",
    options: [
      "Mental health exists on a continuum",
      "People with mental health problems can recover and live fulfilling lives",
      "Mental health problems are a sign of personal weakness",
      "Mental health affects people of all backgrounds and ages",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The belief that mental health problems are a sign of personal weakness is a widespread and harmful myth. Mental health conditions are influenced by a combination of biological, psychological, and social factors. They are not caused by weakness, laziness, or a lack of willpower, and perpetuating this myth contributes to stigma.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Common myths and misconceptions about mental health",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 5,
    question:
      "The mental health continuum suggests that mental health:",
    options: [
      "Is either present or absent with no middle ground",
      "Ranges from thriving through to struggling and crisis, and can fluctuate over time",
      "Only changes when a person is diagnosed with a mental illness",
      "Is fixed from birth and remains constant throughout life",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The mental health continuum model shows that mental health is not simply 'well' or 'unwell'. Instead, it ranges from thriving (good mental health) through to struggling and crisis. Everyone sits somewhere on this continuum, and a person's position can change over time depending on circumstances, support, and other factors.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Mental health spectrum/continuum",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 6,
    question:
      "How many working days are estimated to be lost each year in the UK due to mental health problems?",
    options: [
      "Approximately 10 million",
      "Approximately 30 million",
      "Approximately 70 million",
      "Approximately 120 million",
    ] as const,
    correctAnswer: 2,
    explanation:
      "It is estimated that around 70 million working days are lost each year in the UK due to mental health problems, including stress, depression, and anxiety. This represents a significant cost to employers, the economy, and individuals, reinforcing why workplace mental health support is so important.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Prevalence statistics",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 7,
    question: "What is 'public stigma' in the context of mental health?",
    options: [
      "When a person with a mental health problem internalises negative stereotypes about themselves",
      "When institutions and organisations have policies that discriminate against people with mental health problems",
      "When the general public holds negative attitudes, beliefs, and stereotypes about people with mental health problems",
      "When healthcare professionals refuse to treat people with mental health problems",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Public stigma refers to the negative attitudes, beliefs, and stereotypes held by the general public towards people who experience mental health problems. It can lead to discrimination, social exclusion, and reluctance to seek help. This is distinct from self-stigma (internalised shame) and structural stigma (institutional discrimination).",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Stigma (public, self, structural)",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 8,
    question:
      "A Mental Health First Aider should NOT:",
    options: [
      "Listen non-judgementally to someone in distress",
      "Diagnose mental health conditions or prescribe treatment",
      "Encourage the person to seek appropriate professional help",
      "Provide initial support and reassurance",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A Mental Health First Aider is not qualified to diagnose mental health conditions or prescribe any form of treatment. Their role is to provide initial support, listen non-judgementally, offer reassurance and information, and encourage the person to access appropriate professional help. Staying within these boundaries is a core principle of the MHFA role.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Boundaries of the MHFA role",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 9,
    question: "Which piece of legislation places a duty on employers to protect the health, safety, and welfare of employees at work?",
    options: [
      "The Mental Health Act 1983",
      "The Equality Act 2010",
      "The Health & Safety at Work Act 1974",
      "The Care Act 2014",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The Health & Safety at Work Act 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This includes mental health as well as physical health, meaning employers have a legal obligation to address workplace factors that can harm mental well-being.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Health & Safety at Work Act 1974",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 10,
    question:
      "In the SOLER model of active listening, what does the 'S' stand for?",
    options: [
      "Speak clearly",
      "Sit squarely",
      "Stay calm",
      "Show sympathy",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the SOLER model (developed by Gerard Egan), the 'S' stands for 'Sit squarely', meaning face the person you are listening to in order to show you are engaged and paying attention. The full model is: S - Sit squarely, O - Open posture, L - Lean towards the person, E - Eye contact, R - Relax.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "SOLER model",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 11,
    question:
      "Which industry sector has a particularly high suicide rate in the UK?",
    options: [
      "Education and teaching",
      "Construction",
      "Retail",
      "Financial services",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The construction industry has a particularly high suicide rate in the UK. Male construction workers are approximately three times more likely to take their own lives compared to the male national average. Factors contributing to this include a culture that discourages speaking about emotions, job insecurity, physical demands, and working away from home.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Prevalence statistics",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 12,
    question:
      "What is 'self-stigma' in relation to mental health?",
    options: [
      "When employers discriminate against employees with mental health problems",
      "When the media portrays people with mental health problems negatively",
      "When a person with a mental health problem internalises negative stereotypes and feels shame about their condition",
      "When healthcare services are inadequate for people with mental health problems",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Self-stigma occurs when a person with a mental health problem internalises the negative stereotypes, prejudice, and discrimination that exist in society. This can lead to feelings of shame, reduced self-esteem, and reluctance to seek help. It is one of the three main types of stigma alongside public stigma and structural stigma.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Stigma (public, self, structural)",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 13,
    question:
      "The Equality Act 2010 protects people with mental health conditions from discrimination if their condition:",
    options: [
      "Has been formally diagnosed by a psychiatrist",
      "Is classed as a disability, meaning it has a substantial and long-term adverse effect on day-to-day activities",
      "Requires medication to manage",
      "Has resulted in at least one hospital admission",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Under the Equality Act 2010, mental health conditions are protected as a disability if they have a substantial and long-term (lasting or likely to last 12 months or more) adverse effect on a person's ability to carry out normal day-to-day activities. A formal psychiatric diagnosis is not strictly required; the focus is on the impact of the condition.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Equality Act 2010",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 14,
    question: "Which of the following best describes the role of a Mental Health First Aider?",
    options: [
      "To act as a counsellor and provide ongoing therapy sessions",
      "To provide initial support, listen non-judgementally, and guide the person towards appropriate help",
      "To manage the person's mental health condition on an ongoing basis",
      "To report mental health concerns directly to the person's GP without their consent",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The role of a Mental Health First Aider is to provide initial support, listen without judgement, offer reassurance and information, and encourage the person to access appropriate professional help and other supports. They are not counsellors, therapists, or ongoing case managers, and they should respect confidentiality.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "The MHFA role",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 15,
    question:
      "An open question is one that:",
    options: [
      "Can be answered with a simple 'yes' or 'no'",
      "Encourages a fuller, more detailed response from the person",
      "Is designed to challenge or confront the person",
      "Requires a specific factual answer such as a date or number",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Open questions encourage the person to share more about their thoughts and feelings by requiring a fuller, more detailed response. They typically begin with words like 'how', 'what', 'tell me about', or 'describe'. This is an essential communication skill for Mental Health First Aiders when providing non-judgemental support.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Open questions",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 16,
    question:
      "Confidentiality in the MHFA role means that:",
    options: [
      "You must never share anything the person tells you, under any circumstances",
      "You should keep what the person tells you private unless there is a risk of harm to themselves or others",
      "You are required to tell the person's manager everything they have disclosed",
      "You should only share information with other Mental Health First Aiders in the workplace",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Confidentiality is a core principle of the MHFA role, meaning you should keep what the person tells you private. However, confidentiality can and should be broken if there is a risk of serious harm to the person themselves or to others. In such cases, you have a duty to share information with the appropriate people or services to ensure safety.",
    section: "Mental Health Fundamentals",
    difficulty: "basic" as const,
    topic: "Confidentiality and when it can be broken",
    category: "Mental Health Fundamentals" as const,
  },

  // ===== INTERMEDIATE (id 17-32) =====
  {
    id: 17,
    question:
      "A colleague confides in you that they have been feeling very low and anxious for several weeks but asks you not to tell anyone. You are concerned about their well-being. As a Mental Health First Aider, the most appropriate initial response is to:",
    options: [
      "Immediately inform their line manager so the company can provide support",
      "Listen non-judgementally, offer reassurance, and gently encourage them to seek professional help while respecting their confidentiality",
      "Tell them you cannot help because you are not a trained therapist",
      "Advise them to take some time off work and not worry about it",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The most appropriate initial response is to follow the ALGEE action plan: listen non-judgementally, provide reassurance and information, and encourage them to seek appropriate professional help. You should respect their request for confidentiality unless there is a risk of serious harm. Breaking confidentiality without sufficient cause would damage trust and discourage future help-seeking.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "ALGEE action plan",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 18,
    question:
      "The HSE Management Standards identify six key areas of work design that, if not managed properly, can lead to poor mental health. Which of the following is NOT one of these six areas?",
    options: [
      "Demands",
      "Salary",
      "Relationships",
      "Change",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The six HSE Management Standards areas are: Demands (workload, work patterns), Control (how much say a person has in their work), Support (encouragement and resources), Relationships (promoting positive working and dealing with conflict), Role (understanding of role and avoiding conflict), and Change (how organisational change is managed and communicated). Salary is not one of the six areas.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "HSE Management Standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 19,
    question:
      "Which of the following strategies is most effective for reducing stigma around mental health in the workplace?",
    options: [
      "Avoiding all discussion of mental health to prevent making people uncomfortable",
      "Only discussing mental health during formal training sessions",
      "Creating an open culture where mental health is discussed regularly, leaders share their own experiences, and language is inclusive",
      "Requiring all employees to complete a mandatory mental health questionnaire",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Research shows that stigma is most effectively reduced through contact (hearing from people with lived experience), education, and creating an open, inclusive culture. When leaders share their experiences and mental health is normalised as part of everyday conversation, people feel safer to seek help. Avoiding the topic or only discussing it in formal settings can actually reinforce stigma.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Reducing stigma",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 20,
    question:
      "The 'Thriving at Work' report (Stevenson/Farmer Review 2017) set out a series of core standards for employers. Which of the following is one of those core standards?",
    options: [
      "Provide private health insurance to all employees",
      "Produce, implement, and communicate a mental health at work plan",
      "Employ a full-time psychiatrist on site",
      "Guarantee that no employee will ever experience stress",
    ] as const,
    correctAnswer: 1,
    explanation:
      "One of the core standards from the Thriving at Work report is for employers to produce, implement, and communicate a mental health at work plan. Other core standards include developing mental health awareness among employees, encouraging open conversations, providing good working conditions, promoting effective people management, routinely monitoring employee mental health, and supporting employees returning to work after absence.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Thriving at Work core standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 21,
    question:
      "In the SOLER model, maintaining appropriate eye contact serves the purpose of:",
    options: [
      "Making the person feel they are being watched and assessed",
      "Demonstrating authority and control over the conversation",
      "Showing the person that you are engaged, interested, and paying attention to what they are saying",
      "Ensuring you can read the person's facial expressions to diagnose their condition",
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the SOLER model, maintaining appropriate eye contact (the 'E') demonstrates that you are engaged, interested, and attentive. It helps build rapport and trust. However, it should be natural and culturally sensitive - intense or unbroken eye contact can feel uncomfortable or intimidating, particularly for people from certain cultural backgrounds.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "SOLER model",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 22,
    question:
      "A Mental Health First Aider has been supporting a colleague who seems to be in crisis and mentions thoughts of ending their life. The colleague begs you to keep this confidential. You should:",
    options: [
      "Respect their wishes entirely and keep the information to yourself",
      "Recognise that this is a situation where confidentiality must be broken and seek appropriate help, explaining to the colleague why you need to involve others",
      "Tell all your colleagues so they can keep an eye on the person",
      "Suggest the person is overreacting and will feel better soon",
    ] as const,
    correctAnswer: 1,
    explanation:
      "When someone expresses suicidal thoughts, this represents a risk of serious harm. In this situation, the duty of care overrides confidentiality. You should calmly explain to the person that because you are concerned about their safety, you need to involve appropriate support. This should be done sensitively and with as much involvement of the person as possible, contacting emergency services or an appropriate professional.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Confidentiality and when it can be broken",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 23,
    question:
      "Which of the following is an example of structural stigma in relation to mental health?",
    options: [
      "A person feeling ashamed to admit they have depression",
      "A colleague making a joke about someone being 'crazy'",
      "An insurance policy that offers less coverage for mental health treatment compared to physical health treatment",
      "A friend avoiding someone because they have a mental health diagnosis",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Structural stigma refers to institutional policies, practices, and systems that discriminate against people with mental health problems. An insurance policy providing less coverage for mental health compared to physical health is a clear example of structural stigma. Option A is self-stigma, option B is a form of public stigma or casual discrimination, and option D is social stigma/public stigma in action.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Stigma (public, self, structural)",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 24,
    question:
      "The 'Control' area in the HSE Management Standards refers to:",
    options: [
      "How much management monitors employee behaviour",
      "How much say a person has over how they do their work",
      "The level of control management has over budgets",
      "The security controls in place to protect data",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the HSE Management Standards, 'Control' refers to how much say employees have in the way they do their work. Evidence shows that when employees have an appropriate level of autonomy and input into how their work is organised and carried out, it supports better mental health. A lack of control over one's work is a well-established risk factor for work-related stress.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "HSE Management Standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 25,
    question:
      "When using active listening skills with someone who is distressed, which of the following approaches is most appropriate?",
    options: [
      "Interrupting regularly to share your own similar experiences so they feel less alone",
      "Finishing their sentences to show you understand what they are trying to say",
      "Allowing silences, reflecting back what they have said, and using minimal encouragers such as nodding",
      "Keeping the conversation factual and discouraging emotional expression to avoid things escalating",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Effective active listening involves allowing silences (giving the person space to think and feel), reflecting back what they have said (to show understanding), and using minimal encouragers such as nodding and brief verbal prompts. Interrupting, finishing sentences, or discouraging emotional expression can make the person feel unheard and dismissed.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Communication skills, active listening",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 26,
    question:
      "A non-judgemental approach in MHFA means:",
    options: [
      "Agreeing with everything the person says even if it concerns you",
      "Setting aside your own opinions and values to provide a safe space where the person feels accepted and heard",
      "Pretending you have no opinion on what the person is telling you",
      "Only responding positively and avoiding any difficult topics",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Being non-judgemental means genuinely setting aside your own opinions, values, and assumptions so the person feels safe, accepted, and heard. It does not mean agreeing with everything, pretending you have no opinion, or avoiding difficult topics. It means creating a space where the person can express themselves without fear of being criticised, blamed, or dismissed.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Non-judgemental approach",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 27,
    question:
      "The 'duty to refer' in the context of mental health at work means:",
    options: [
      "The legal requirement for all employees to report any colleague showing signs of mental illness",
      "The responsibility of a line manager or MHFA to signpost a person to appropriate professional support when a situation is beyond their competence",
      "The obligation of a GP to refer all patients with mental health concerns to a psychiatrist",
      "The requirement for HR to refer all mental health cases to occupational health",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The duty to refer means recognising when a situation is beyond your competence and signposting or referring the person to appropriate professional support. For a Mental Health First Aider or line manager, this means knowing the limits of your role and directing the person towards services such as their GP, Employee Assistance Programme, occupational health, or emergency services as appropriate.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Duty of care, duty to refer",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 28,
    question:
      "Cultural sensitivity in MHFA is important because:",
    options: [
      "Different cultures have identical views on mental health and treatment",
      "Cultural background can influence how people experience, express, and seek help for mental health problems",
      "It is a legal requirement to ask about someone's cultural background before offering support",
      "Only people from certain cultures experience mental health problems",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cultural sensitivity is important because a person's cultural background can significantly influence how they experience, understand, express, and seek help for mental health problems. Some cultures may have different attitudes to mental health, different ways of expressing distress, or different expectations around family involvement. Being culturally sensitive means being aware of and respectful of these differences while still providing effective support.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Cultural sensitivity",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 29,
    question:
      "Which of the following best describes 'duty of care' in relation to mental health at work?",
    options: [
      "Employers must guarantee that employees never experience stress or mental health difficulties",
      "Employers have a reasonable responsibility to take steps to protect the physical and mental health of their employees",
      "Employees must disclose all mental health conditions to their employer",
      "Only organisations with more than 250 employees have a duty of care",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Duty of care means that employers have a reasonable responsibility to take steps to ensure the health, safety, and well-being of their employees, including mental health. This does not mean guaranteeing no one ever experiences stress, but rather taking reasonable steps to prevent harm, manage risks, and support employees. This duty applies to all employers regardless of organisational size.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Duty of care, duty to refer",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 30,
    question:
      "The 'Relationships' area in the HSE Management Standards focuses on:",
    options: [
      "Employees' personal relationships outside of work",
      "Promoting positive working relationships and dealing with unacceptable behaviour such as bullying",
      "Ensuring all employees socialise together outside of working hours",
      "Monitoring employees' social media activity",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The 'Relationships' area in the HSE Management Standards relates to promoting positive working to avoid conflict and dealing with unacceptable behaviour such as bullying and harassment. Healthy workplace relationships are a key factor in protecting mental health, and employers should have systems in place to address issues like bullying, conflict, and discrimination.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "HSE Management Standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 31,
    question:
      "Which of the following is a core standard from the Thriving at Work report (2017)?",
    options: [
      "Offer all employees unlimited paid mental health leave",
      "Routinely monitor employee mental health and well-being",
      "Remove all workplace targets and deadlines to reduce stress",
      "Appoint a board-level mental health director in every organisation",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Thriving at Work report (Stevenson/Farmer Review 2017) identified several core standards, one of which is to routinely monitor employee mental health and well-being. Other core standards include producing a mental health at work plan, developing mental health awareness, encouraging open conversations, providing good working conditions, and promoting effective people management.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "Thriving at Work core standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 32,
    question:
      "When giving reassurance and information (the 'G' in ALGEE), the Mental Health First Aider should:",
    options: [
      "Provide a detailed explanation of all possible mental health conditions the person might have",
      "Share relevant, accurate information and reassure the person that help is available and recovery is possible",
      "Minimise the person's concerns by telling them many people have it worse",
      "Recommend specific medications they have heard are effective",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The 'G' in ALGEE stands for 'Give reassurance and information'. This means providing relevant, accurate information about mental health and the support available, and reassuring the person that mental health problems are common, treatable, and recovery is possible. It does not involve diagnosing, recommending medication, or minimising the person's experience.",
    section: "Mental Health Fundamentals",
    difficulty: "intermediate" as const,
    topic: "ALGEE action plan",
    category: "Mental Health Fundamentals" as const,
  },

  // ===== ADVANCED (id 33-40) =====
  {
    id: 33,
    question:
      "A Mental Health First Aider in a construction company notices that a team of workers have become increasingly withdrawn after a colleague's suicide. Several team members are displaying signs of distress but none are seeking help. Considering cultural factors specific to the construction industry, the most effective approach would be to:",
    options: [
      "Send an email to the team with information about the Employee Assistance Programme and leave it to them to reach out",
      "Arrange a mandatory group therapy session led by an external counsellor",
      "Adopt a proactive, informal approach by making yourself visible and available on-site, normalising conversations about mental health, and providing information about support in a way that does not require workers to publicly identify as needing help",
      "Report all team members showing signs of distress to management for formal referral",
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the construction industry, there is often a strong culture of masculinity and stoicism that discourages workers from openly seeking help for mental health concerns. Following a colleague's suicide, a proactive, informal, and culturally sensitive approach is most likely to be effective. This means being present and approachable, normalising conversations about mental health, and providing discreet access to support rather than relying on formal processes that may feel exposing or stigmatising in this context.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Cultural sensitivity",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 34,
    question:
      "An employer has identified through routine monitoring that work-related stress is increasing in a particular department. Using the HSE Management Standards framework, which approach would be most effective for addressing this?",
    options: [
      "Offering the affected employees individual stress management training to build their personal resilience",
      "Conducting a systematic assessment across all six Management Standards areas (Demands, Control, Support, Relationships, Role, Change) to identify specific organisational risk factors and implementing targeted changes at the organisational level",
      "Replacing the department manager and hoping this resolves the issue",
      "Introducing flexible working hours for all employees across the organisation",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The HSE Management Standards framework is designed to address work-related stress at the organisational level, not just the individual level. The most effective approach is to systematically assess all six areas (Demands, Control, Support, Relationships, Role, Change) within the affected department to identify specific risk factors, and then implement targeted organisational changes. While individual resilience training can be helpful, it should not be the primary or sole response, as this can inadvertently place the blame on employees rather than addressing systemic issues.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "HSE Management Standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 35,
    question:
      "A Mental Health First Aider is supporting a colleague who discloses they are self-harming. The colleague is over 18 and states clearly that they do not want anyone else to know. They say the self-harm helps them cope and they are not suicidal. Considering the legal and ethical framework, the most appropriate course of action is to:",
    options: [
      "Immediately break confidentiality and inform their manager, as self-harm always requires escalation",
      "Respect their autonomy as an adult while expressing concern, exploring their reasons for not wanting others to know, strongly encouraging professional help, and documenting the conversation for your own safeguarding records",
      "Agree to keep it completely confidential and take no further action since they are not suicidal",
      "Refuse to continue the conversation as self-harm is beyond the scope of your role",
    ] as const,
    correctAnswer: 1,
    explanation:
      "This scenario requires balancing confidentiality, duty of care, and individual autonomy. As the person is an adult, not expressing suicidal intent, and has capacity, their autonomy should be respected. However, the MHFA should express genuine concern, explore barriers to seeking help, strongly encourage professional support, and keep a confidential record. Self-harm alone, in the absence of suicidal intent or immediate risk to life, does not automatically require breaking confidentiality. The MHFA should also seek supervision or support for themselves given the emotional weight of the disclosure.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Confidentiality and when it can be broken",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 36,
    question:
      "An organisation is implementing the enhanced standards from the Thriving at Work report. They already meet the core standards. Which of the following would represent progress towards the enhanced standards?",
    options: [
      "Increasing the number of car parking spaces available to employees",
      "Increasing transparency and accountability through internal and external reporting on mental health, including senior leaders publicly championing mental health and sharing their own experiences",
      "Providing free fruit in the office kitchen",
      "Extending the Christmas party to a two-day event to boost morale",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Thriving at Work enhanced standards go beyond the core standards and include measures such as increasing transparency and accountability through internal and external reporting, with senior leaders publicly championing mental health. Other enhanced standards include tailoring support for specific groups (such as those in high-risk roles), improving support for people returning to work after mental health absence, and measuring the impact of mental health initiatives. The enhanced standards reflect a deeper organisational commitment to mental health.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Thriving at Work core standards",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 37,
    question:
      "A large electrical contracting firm has noticed high turnover and increasing sickness absence. Exit interviews suggest poor management practices and a culture of presenteeism. Analysing this through the lens of both the Health & Safety at Work Act 1974 and the HSE Management Standards, which statement is most accurate?",
    options: [
      "The employer has no legal liability because mental health is not covered by health and safety legislation",
      "The employer is potentially failing in their legal duty under the Health & Safety at Work Act 1974 to protect employee welfare, and a systematic assessment using the HSE Management Standards could help identify and address the organisational factors contributing to poor mental health, potentially reducing both turnover and absence",
      "The employer only needs to address this if an employee makes a formal complaint or takes legal action",
      "The employer should simply increase salaries to solve the problem, as financial stress is the most likely cause",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Health & Safety at Work Act 1974 places a duty on employers to protect the health, safety, and welfare of employees, and this explicitly includes mental health. Poor management practices and a culture of presenteeism suggest the employer may be failing to manage psychosocial risks. The HSE Management Standards provide a practical framework for systematically assessing and addressing organisational factors such as demands, control, support, relationships, role clarity, and change management. Employers have a proactive duty; they should not wait for formal complaints.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Health & Safety at Work Act 1974",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 38,
    question:
      "When considering the mental health continuum in a workplace setting, which of the following scenarios best illustrates why a continuum model is more useful than a binary 'well/unwell' model?",
    options: [
      "An employee who is diagnosed with anxiety takes medication and is immediately well again",
      "An employee with no diagnosed condition begins to struggle with sleep, concentration, and motivation after a period of organisational change, and their performance gradually declines even though they would not meet diagnostic criteria for a mental health condition",
      "An employee either has depression or does not have depression, and their manager needs to know which it is to provide the right support",
      "An employee only needs support once they have received a formal diagnosis from a mental health professional",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The continuum model is more useful because it recognises that mental health is not simply a matter of being 'well' or 'unwell'. Option B illustrates how an employee can move along the continuum from thriving to struggling without necessarily meeting diagnostic criteria for a specific condition. This model enables earlier intervention, as support can be provided when someone is beginning to struggle, rather than waiting until they reach a crisis point or receive a formal diagnosis. It also reduces stigma by normalising the fluctuation of mental health.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Mental health spectrum/continuum",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 39,
    question:
      "A Mental Health First Aider is approached by a colleague from a cultural background where mental health problems are considered deeply shameful and a private family matter. The colleague is clearly distressed but is reluctant to discuss their feelings or accept help. Applying principles of cultural sensitivity, non-judgemental communication, and the ALGEE framework, the best approach is to:",
    options: [
      "Tell the colleague that their cultural beliefs about mental health are wrong and they need to adopt a more modern perspective",
      "Respect that they do not want help and walk away without further engagement",
      "Acknowledge and respect their cultural perspective without judgement, gently express your concern, offer to be available if they change their mind, and provide discreet information about culturally appropriate support services",
      "Insist they speak to a counsellor immediately for their own good",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Cultural sensitivity requires respecting the person's cultural perspective while still showing genuine concern. The ALGEE framework should be adapted to the cultural context. This means approaching with care, listening without judgement, acknowledging their cultural frame of reference, not dismissing or challenging their beliefs, and offering support in a way that respects their autonomy. Providing information about culturally appropriate services (such as those available in their first language or from practitioners with shared cultural understanding) can reduce barriers to seeking help.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Cultural sensitivity",
    category: "Mental Health Fundamentals" as const,
  },
  {
    id: 40,
    question:
      "An organisation is defending an employment tribunal claim under the Equality Act 2010 brought by an employee who was dismissed while experiencing a severe depressive episode. The employer claims they were unaware of the condition. Considering the legal framework, which of the following is most accurate?",
    options: [
      "The employer is automatically protected from liability if the employee never formally disclosed their condition",
      "Under the Equality Act 2010, an employer can be held liable if they knew or could reasonably have been expected to know about the employee's disability, and the duty to make reasonable adjustments can arise even without formal disclosure if there were indicators that the employer should have noticed",
      "Mental health conditions can never be classed as a disability under the Equality Act 2010",
      "The Equality Act 2010 only applies to physical disabilities and not to mental health conditions",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Under the Equality Act 2010, employers have a duty to make reasonable adjustments for employees with disabilities, which can include mental health conditions that have a substantial and long-term adverse effect on day-to-day activities. Crucially, an employer can be held liable if they knew or could reasonably have been expected to know about the disability. This means that if there were visible signs such as changes in behaviour, performance, attendance patterns, or if the employee had disclosed to a manager or colleague, the employer may be deemed to have had constructive knowledge. Simply claiming ignorance is not always a defence.",
    section: "Mental Health Fundamentals",
    difficulty: "advanced" as const,
    topic: "Equality Act 2010",
    category: "Mental Health Fundamentals" as const,
  },

  // =======================================================================
  // DEPRESSION, ANXIETY & STRESS — 40 questions (id 41–80)
  // =======================================================================

  // ============================================================
  // BASIC (16 questions, IDs 41-56)
  // ============================================================
  {
    id: 41,
    question: "How long must symptoms of low mood persist before clinical depression may be diagnosed?",
    options: [
      "At least 3 days",
      "At least 1 week",
      "At least 2 weeks",
      "At least 6 weeks",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Clinical depression is typically diagnosed when symptoms persist for at least 2 weeks and cause significant impairment in daily functioning. Low mood lasting a few days is a normal human experience and does not meet the threshold for clinical depression.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Clinical depression vs low mood",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 42,
    question: "Which of the following is a key difference between low mood and clinical depression?",
    options: [
      "Low mood always requires medication",
      "Clinical depression is a diagnosable condition that significantly impairs daily functioning",
      "Low mood lasts longer than clinical depression",
      "Clinical depression only affects your thoughts, not your body",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Clinical depression is a diagnosable mental health condition that significantly impairs a person's ability to function in daily life, work, and relationships. Low mood is a normal emotional response that usually passes on its own without treatment.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Clinical depression vs low mood",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 43,
    question: "Which type of depression is linked to seasonal changes, typically worsening during winter months?",
    options: [
      "Postnatal depression",
      "Persistent depressive disorder",
      "Seasonal Affective Disorder (SAD)",
      "Major Depressive Disorder",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Seasonal Affective Disorder (SAD) is a type of depression that follows a seasonal pattern, most commonly worsening during autumn and winter when daylight hours are reduced. It is thought to be related to reduced exposure to sunlight affecting serotonin and melatonin levels.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Types of depression",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 44,
    question: "Which of the following is a common emotional symptom of depression?",
    options: [
      "Increased appetite",
      "Persistent feelings of hopelessness and sadness",
      "Rapid heartbeat",
      "Muscle tension",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Persistent feelings of hopelessness and sadness are core emotional symptoms of depression. Increased appetite can be a physical symptom (though decreased appetite is more common), while rapid heartbeat and muscle tension are more commonly associated with anxiety.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Depression symptoms",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 45,
    question: "What does the 'fight-flight-freeze' response describe?",
    options: [
      "A type of panic disorder",
      "The body's automatic survival response to perceived danger",
      "A technique used in CBT therapy",
      "The stages of burnout",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The fight-flight-freeze response is the body's automatic physiological reaction to a perceived threat or danger. It is controlled by the sympathetic nervous system and prepares the body to either confront the threat (fight), run away (flight), or become immobile (freeze).",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Fight-flight-freeze response",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 46,
    question: "Which of the following is a common physical symptom of anxiety?",
    options: [
      "Feeling emotionally numb",
      "Loss of interest in hobbies",
      "Heart palpitations and shortness of breath",
      "Sleeping too much",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Heart palpitations and shortness of breath are common physical symptoms of anxiety caused by the activation of the sympathetic nervous system. Feeling emotionally numb and loss of interest are more associated with depression, while sleeping too much (hypersomnia) can occur in depression.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Physical symptoms of anxiety",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 47,
    question: "How long does a typical panic attack usually last?",
    options: [
      "30 seconds to 1 minute",
      "5 to 20 minutes",
      "1 to 3 hours",
      "The whole day",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A typical panic attack usually peaks within about 10 minutes and lasts between 5 and 20 minutes, although some symptoms may linger longer. Despite feeling extremely distressing and frightening, panic attacks are not physically dangerous.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Panic attacks",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 48,
    question: "What is the HSE definition of workplace stress?",
    options: [
      "Feeling tired after a long shift",
      "The adverse reaction people have to excessive pressures or demands placed on them",
      "A diagnosed mental health condition requiring medication",
      "Normal pressure that helps people perform well",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Health and Safety Executive (HSE) defines work-related stress as 'the adverse reaction people have to excessive pressures or other types of demand placed on them'. This distinguishes harmful stress from normal, manageable workplace pressure.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Workplace stress",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 49,
    question: "What is the difference between acute and chronic stress?",
    options: [
      "Acute stress is always harmful; chronic stress is beneficial",
      "Acute stress is short-term; chronic stress is long-lasting and ongoing",
      "Acute stress only affects the mind; chronic stress only affects the body",
      "There is no meaningful difference between the two",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Acute stress is a short-term response to an immediate perceived threat or challenge and usually resolves quickly. Chronic stress is long-lasting, ongoing stress that persists over weeks, months, or years. Chronic stress is particularly harmful to physical and mental health.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Acute vs chronic stress",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 50,
    question: "Which of the following is something you should NOT say to someone experiencing depression?",
    options: [
      "\"I'm here for you and I'm listening\"",
      "\"Just snap out of it and think positive\"",
      "\"Would you like to talk about how you're feeling?\"",
      "\"I've noticed you haven't seemed yourself lately\"",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Telling someone to 'snap out of it' or 'think positive' minimises their experience and implies that depression is a choice. Depression is a medical condition, not a lack of willpower. Supportive statements that show you care and are willing to listen are far more helpful.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "What to say / what NOT to say",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 51,
    question: "What does CBT stand for?",
    options: [
      "Cognitive Behavioural Therapy",
      "Clinical Behavioural Treatment",
      "Comprehensive Brain Therapy",
      "Counselling-Based Technique",
    ] as const,
    correctAnswer: 0,
    explanation:
      "CBT stands for Cognitive Behavioural Therapy. It is a widely used, evidence-based talking therapy that helps people identify and change unhelpful thinking patterns and behaviours. It is recommended by NICE as a first-line treatment for many mental health conditions including depression and anxiety.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Talking therapies",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 52,
    question: "Which type of depression can occur after giving birth?",
    options: [
      "Seasonal Affective Disorder",
      "Postnatal depression",
      "Persistent depressive disorder",
      "Generalised Anxiety Disorder",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Postnatal depression (also called postpartum depression) can develop in the weeks and months following childbirth. It is different from the 'baby blues', which are milder and typically resolve within two weeks. Postnatal depression requires professional support and treatment.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Types of depression",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 53,
    question: "What is a common behavioural symptom of depression?",
    options: [
      "Excessive hand-washing",
      "Withdrawing from social activities and isolating yourself",
      "Checking locks repeatedly",
      "Hyperventilating",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Social withdrawal and isolation are common behavioural symptoms of depression. People may stop seeing friends, avoid activities they once enjoyed, and pull away from family and colleagues. Excessive hand-washing and checking are more associated with OCD, while hyperventilating is linked to anxiety and panic.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Depression symptoms",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 54,
    question: "What is Generalised Anxiety Disorder (GAD)?",
    options: [
      "A fear of a specific object or situation",
      "Anxiety that only occurs during panic attacks",
      "A condition involving persistent, excessive worry about many different things",
      "A type of depression",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Generalised Anxiety Disorder (GAD) is characterised by persistent, excessive, and uncontrollable worry about a wide range of everyday issues such as health, finances, work, and relationships. The worry is disproportionate to the actual likelihood of the feared events occurring.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Anxiety disorders",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 55,
    question: "What is the first thing you should do if someone is having a panic attack?",
    options: [
      "Leave them alone so they can calm down",
      "Tell them to stop being dramatic",
      "Stay calm, reassure them, and help them focus on slow breathing",
      "Call 999 immediately",
    ] as const,
    correctAnswer: 2,
    explanation:
      "When someone is having a panic attack, the most helpful first response is to stay calm yourself, reassure them that they are safe and the panic will pass, and gently encourage slow, controlled breathing. Leaving them alone or dismissing their experience is unhelpful. Calling 999 is not usually necessary unless you suspect a medical emergency.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Panic attacks",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 56,
    question: "Which of the following is a risk factor for developing depression?",
    options: [
      "Regular physical exercise",
      "Strong social support network",
      "Family history of depression",
      "Having a varied diet",
    ] as const,
    correctAnswer: 2,
    explanation:
      "A family history of depression is a recognised risk factor, as genetics can play a role in predisposing someone to the condition. Other risk factors include significant life events, chronic illness, substance misuse, and social isolation. Regular exercise, strong social support, and a healthy diet are protective factors.",
    section: "Depression, Anxiety & Stress",
    difficulty: "basic" as const,
    topic: "Risk factors for depression",
    category: "Depression, Anxiety & Stress" as const,
  },

  // ============================================================
  // INTERMEDIATE (16 questions, IDs 57-72)
  // ============================================================
  {
    id: 57,
    question: "What is persistent depressive disorder (formerly known as dysthymia)?",
    options: [
      "A severe but short-lived episode of depression lasting less than a week",
      "A chronic form of depression lasting 2 years or more with milder but persistent symptoms",
      "Depression that only occurs during winter months",
      "A type of anxiety disorder with depressive features",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Persistent depressive disorder (previously called dysthymia) is a chronic form of depression where symptoms last for 2 years or more in adults. While symptoms are often less severe than Major Depressive Disorder, their persistent nature can significantly impact quality of life and daily functioning.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Types of depression",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 58,
    question: "Which of the following best describes the cognitive symptoms of depression?",
    options: [
      "Increased energy and racing thoughts",
      "Difficulty concentrating, indecisiveness, and negative thinking patterns",
      "Hearing voices and visual hallucinations",
      "Improved memory and heightened awareness",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cognitive symptoms of depression include difficulty concentrating, problems with memory, indecisiveness, and persistent negative thinking patterns such as self-blame, guilt, and hopelessness. These cognitive changes can significantly impair work performance and daily decision-making.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Depression symptoms",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 59,
    question: "What are the three dimensions of the Maslach Burnout Model?",
    options: [
      "Sadness, anxiety, and anger",
      "Emotional exhaustion, cynicism (depersonalisation), and reduced personal efficacy",
      "Physical fatigue, mental fatigue, and emotional fatigue",
      "Stress, depression, and burnout",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Maslach Burnout Model identifies three key dimensions: emotional exhaustion (feeling drained and unable to cope), cynicism or depersonalisation (becoming detached and negative towards work and colleagues), and reduced personal efficacy (feeling incompetent and unproductive). All three dimensions must be considered when assessing burnout.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Maslach burnout model",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 60,
    question: "In the ALGEE action plan for mental health first aid, what does the 'E' (first E) stand for?",
    options: [
      "Evaluate the risk",
      "Encourage appropriate professional help",
      "Empathise with the person",
      "Examine the symptoms",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the ALGEE action plan, the first 'E' stands for Encourage appropriate professional help. The full acronym is: Approach, assess and assist with any crisis (A), Listen non-judgementally (L), Give reassurance and information (G), Encourage appropriate professional help (E), and Encourage self-help and other support strategies (E).",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Supporting someone using ALGEE",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 61,
    question: "What characterises social anxiety disorder?",
    options: [
      "Fear of open spaces and crowded places",
      "Intense fear and avoidance of social situations due to worry about being judged or embarrassed",
      "Recurring, unwanted intrusive thoughts",
      "Flashbacks to a traumatic event",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Social anxiety disorder (social phobia) involves an intense, persistent fear of being watched, judged, or embarrassed in social situations. People with this condition may avoid social interactions, public speaking, or eating in front of others. It goes beyond normal shyness and significantly impacts daily life.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Anxiety disorders",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 62,
    question: "Which of the following is true about SSRIs (Selective Serotonin Reuptake Inhibitors)?",
    options: [
      "They are physically addictive like opioids",
      "They work immediately from the first dose",
      "They are not addictive, but stopping suddenly can cause withdrawal symptoms",
      "They should only be taken during depressive episodes and stopped when feeling better",
    ] as const,
    correctAnswer: 2,
    explanation:
      "SSRIs are not addictive in the way that substances like opioids or alcohol are. However, stopping them suddenly can cause discontinuation symptoms (sometimes called withdrawal), such as dizziness, nausea, and mood changes. This is why doses should always be reduced gradually under medical supervision.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "SSRIs basics",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 63,
    question: "What is agoraphobia?",
    options: [
      "A fear of spiders",
      "A fear of heights",
      "An anxiety disorder involving fear of situations where escape might be difficult, such as open spaces or crowds",
      "A fear of confined spaces",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Agoraphobia is an anxiety disorder characterised by fear and avoidance of situations or places where the person feels escape might be difficult or help unavailable if they have a panic attack. This can include open spaces, crowds, public transport, or being outside the home alone. It often develops alongside panic disorder.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Anxiety disorders",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 64,
    question: "What does OCD stand for, and what are its two main features?",
    options: [
      "Obsessive Compulsive Disorder; obsessions (intrusive thoughts) and compulsions (repetitive behaviours)",
      "Obsessive Control Disorder; controlling behaviour and anger",
      "Occasional Compulsive Distress; occasional worry and distress",
      "Overwhelming Cognitive Dysfunction; memory loss and confusion",
    ] as const,
    correctAnswer: 0,
    explanation:
      "OCD stands for Obsessive Compulsive Disorder. It has two main features: obsessions (unwanted, intrusive, and distressing thoughts, images, or urges) and compulsions (repetitive behaviours or mental acts performed to reduce the anxiety caused by the obsessions). Common examples include contamination fears leading to excessive hand-washing.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "OCD and PTSD basics",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 65,
    question: "Why is the construction industry associated with higher levels of stress and mental health problems?",
    options: [
      "Construction workers are naturally more prone to mental illness",
      "Factors including long hours, time away from family, job insecurity, physical demands, and a culture of not talking about feelings",
      "Construction workers have less access to healthcare than other professions",
      "The industry has no health and safety regulations",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The construction industry faces unique mental health challenges due to factors such as long and unpredictable working hours, time away from home and family, job insecurity and short-term contracts, physically demanding work, a macho culture that discourages discussing emotions, and higher rates of substance misuse. These factors combine to create elevated risk.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Stress in construction",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 66,
    question: "What is the NICE stepped care model for treating depression?",
    options: [
      "A model where everyone receives the same level of treatment regardless of severity",
      "A model where the most intensive treatments are always tried first",
      "A framework where treatment is matched to severity, starting with least intensive and stepping up if needed",
      "A model that only recommends medication for depression",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The NICE stepped care model is a framework for organising mental health services where people receive the least intensive treatment appropriate to their needs first, and 'step up' to more intensive treatments only if they do not improve. Steps range from self-help and guided self-help at lower levels to specialist services and inpatient care at higher levels.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "NICE stepped care model",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 67,
    question: "What is NHS Talking Therapies (formerly IAPT)?",
    options: [
      "A private counselling service only available through employer schemes",
      "An NHS service providing evidence-based psychological therapies for anxiety and depression, accessible via self-referral",
      "An emergency psychiatric service for people in crisis",
      "A telephone helpline staffed by volunteers",
    ] as const,
    correctAnswer: 1,
    explanation:
      "NHS Talking Therapies (previously known as Improving Access to Psychological Therapies or IAPT) is an NHS programme that provides evidence-based talking therapies for common mental health conditions like depression and anxiety. A key feature is that people can self-refer without needing a GP referral, making it more accessible.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "GP referral pathway, NHS Talking Therapies",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 68,
    question: "Which of the following is a common side effect when first starting SSRIs?",
    options: [
      "Immediate improvement in mood",
      "Nausea, headaches, and increased anxiety in the first few weeks",
      "Complete loss of all emotions permanently",
      "Severe allergic reactions in most people",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Common side effects when starting SSRIs include nausea, headaches, sleep disturbance, and a temporary increase in anxiety. These side effects usually improve within the first 1-2 weeks. SSRIs typically take 4-6 weeks to show their full therapeutic effect on mood. Serious side effects are uncommon.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "SSRIs basics",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 69,
    question: "What is PTSD and what triggers it?",
    options: [
      "Post-Traumatic Stress Disorder; triggered by experiencing or witnessing a traumatic event",
      "Persistent Tension and Stress Disorder; triggered by workplace pressure",
      "Post-Treatment Stress Dysfunction; triggered by medical procedures",
      "Progressive Thought Suppression Disorder; triggered by negative thinking",
    ] as const,
    correctAnswer: 0,
    explanation:
      "PTSD (Post-Traumatic Stress Disorder) is a mental health condition triggered by experiencing or witnessing a terrifying or life-threatening event. Symptoms include flashbacks, nightmares, severe anxiety, hypervigilance, and avoidance of reminders of the trauma. It can develop weeks, months, or even years after the event.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "OCD and PTSD basics",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 70,
    question: "What is the role of a GP in the treatment pathway for depression?",
    options: [
      "GPs only prescribe medication and cannot provide other support",
      "GPs assess symptoms, diagnose depression, discuss treatment options, and can refer to specialist services",
      "GPs are not trained to deal with mental health conditions",
      "GPs can only refer to private therapists",
    ] as const,
    correctAnswer: 1,
    explanation:
      "GPs play a central role in the depression treatment pathway. They assess symptoms, make diagnoses, discuss treatment options (including medication and talking therapies), monitor progress, and refer to specialist mental health services when needed. They are often the first point of professional contact for people experiencing depression.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "GP referral pathway, NHS Talking Therapies",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 71,
    question: "Which of the following describes panic disorder?",
    options: [
      "A single panic attack caused by a specific phobia",
      "Recurrent, unexpected panic attacks with persistent worry about having further attacks",
      "Feeling mildly anxious most of the time",
      "A fear of social situations",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Panic disorder is characterised by recurrent and unexpected panic attacks, along with persistent worry or fear about having more attacks, and changes in behaviour to avoid situations that might trigger them. It is different from having occasional panic attacks in response to a specific trigger.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Anxiety disorders",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 72,
    question: "Which self-help strategy is widely recommended for managing both depression and anxiety?",
    options: [
      "Avoiding all social contact to reduce stimulation",
      "Consuming alcohol to relax",
      "Regular physical exercise and maintaining a routine",
      "Working longer hours to distract yourself",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Regular physical exercise is one of the most widely recommended self-help strategies for managing both depression and anxiety. Exercise releases endorphins, improves sleep, and provides structure to the day. NICE guidelines recommend structured exercise programmes as part of depression treatment. Maintaining a daily routine also helps provide stability and purpose.",
    section: "Depression, Anxiety & Stress",
    difficulty: "intermediate" as const,
    topic: "Self-help and wellbeing strategies",
    category: "Depression, Anxiety & Stress" as const,
  },

  // ============================================================
  // ADVANCED (8 questions, IDs 73-80)
  // ============================================================
  {
    id: 73,
    question: "In the NICE stepped care model for depression, at which step would high-intensity psychological interventions such as individual CBT typically be offered?",
    options: [
      "Step 1 — Assessment and watchful waiting",
      "Step 2 — Low-intensity interventions",
      "Step 3 — High-intensity interventions for moderate to severe depression",
      "Step 4 — Specialist and inpatient care",
    ] as const,
    correctAnswer: 2,
    explanation:
      "In the NICE stepped care model, high-intensity psychological interventions such as individual CBT, interpersonal therapy (IPT), or behavioural activation are offered at Step 3, which is for people with moderate to severe depression or those who have not responded to Step 2 low-intensity interventions such as guided self-help or computerised CBT.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "NICE stepped care model",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 74,
    question: "A construction worker discloses to you that he has been feeling hopeless for several weeks, has stopped eating properly, and says 'what's the point anymore'. Using the ALGEE framework, what should your first priority be?",
    options: [
      "Give reassurance and information about depression",
      "Encourage self-help strategies like exercise",
      "Approach, assess, and assist with any crisis — including assessing for suicidal thoughts",
      "Listen non-judgementally to his full story before taking action",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The 'A' in ALGEE stands for 'Approach, assess and assist with any crisis'. When someone expresses hopelessness and uses phrases like 'what's the point', the first priority is to assess whether they are having suicidal thoughts and ensure their immediate safety. This always comes before listening, giving information, or encouraging help-seeking.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "Supporting someone using ALGEE",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 75,
    question: "How does Interpersonal Therapy (IPT) differ from CBT in its approach to treating depression?",
    options: [
      "IPT focuses on changing negative thought patterns while CBT focuses on relationships",
      "IPT focuses on how relationship difficulties and life changes contribute to depression, while CBT focuses on changing unhelpful thought patterns and behaviours",
      "IPT uses medication alongside therapy while CBT does not",
      "There is no difference; they are the same therapy with different names",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Interpersonal Therapy (IPT) focuses on how a person's relationships and interpersonal difficulties (such as grief, role disputes, role transitions, and interpersonal deficits) contribute to their depression. CBT, in contrast, focuses on identifying and changing unhelpful thinking patterns and behaviours. Both are NICE-recommended treatments for depression.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "Talking therapies",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 76,
    question: "Which of the following accurately describes the relationship between the Maslach burnout dimensions and workplace outcomes in construction?",
    options: [
      "Only emotional exhaustion affects workplace safety; cynicism and inefficacy are irrelevant",
      "Burnout only affects mental health and has no impact on physical safety at work",
      "Emotional exhaustion impairs concentration, cynicism reduces teamwork and communication, and reduced efficacy leads to poor decision-making — all increasing safety risks",
      "Burnout is the same as being tired and resolves with a holiday",
    ] as const,
    correctAnswer: 2,
    explanation:
      "All three dimensions of the Maslach burnout model have significant implications for workplace safety in construction. Emotional exhaustion impairs concentration and alertness, cynicism (depersonalisation) undermines teamwork and communication vital for safety, and reduced personal efficacy leads to poor judgement and decision-making. Together, these create serious safety risks in high-hazard environments.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "Maslach burnout model",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 77,
    question: "A colleague tells you he's been prescribed sertraline (an SSRI) but wants to stop taking it after two weeks because 'it's not working'. What is the most appropriate response?",
    options: [
      "Agree that if it hasn't worked yet, it probably won't",
      "Tell him to double the dose to speed things up",
      "Explain that SSRIs typically take 4-6 weeks to show full effect and encourage him to discuss concerns with his GP before making changes",
      "Suggest he switches to a different medication himself",
    ] as const,
    correctAnswer: 2,
    explanation:
      "SSRIs typically take 4 to 6 weeks to reach their full therapeutic effect. Early side effects (such as nausea and increased anxiety) often settle within the first 1-2 weeks. It is important to encourage the person to continue taking the medication as prescribed and to speak with their GP before making any changes, as stopping suddenly can cause withdrawal symptoms.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "SSRIs basics",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 78,
    question: "Which of the following correctly distinguishes between a specific phobia and Generalised Anxiety Disorder?",
    options: [
      "A specific phobia involves excessive worry about many things; GAD involves fear of one specific thing",
      "A specific phobia involves intense fear triggered by a particular object or situation; GAD involves persistent, excessive worry across multiple areas of life",
      "A specific phobia is more severe than GAD",
      "GAD involves avoidance of a single trigger while specific phobias involve generalised avoidance",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A specific phobia is an intense, irrational fear triggered by a particular object or situation (such as heights, spiders, or flying), leading to avoidance behaviour. GAD, by contrast, involves persistent and excessive worry about many different areas of life (health, finances, work, relationships) that is difficult to control and is not focused on a single trigger.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "Anxiety disorders",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 79,
    question: "In supporting a construction worker experiencing chronic stress and early signs of depression, which combination of actions best reflects the ALGEE approach and appropriate referral pathways?",
    options: [
      "Tell them to take some time off, give them a leaflet about depression, and move on",
      "Listen non-judgementally, provide information about depression, encourage them to see their GP, and suggest self-help strategies such as NHS Talking Therapies self-referral",
      "Diagnose them with depression, recommend specific medication, and inform their supervisor",
      "Avoid bringing up the subject as it might make things worse",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The ALGEE framework guides you to: approach and assess (checking for crisis), listen non-judgementally, give reassurance and information, encourage appropriate professional help (such as seeing their GP), and encourage self-help strategies. Suggesting NHS Talking Therapies, which allows self-referral, empowers the person to access support directly. You should never diagnose, recommend medication, or disclose someone's mental health to others without consent.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "Supporting someone using ALGEE",
    category: "Depression, Anxiety & Stress" as const,
  },
  {
    id: 80,
    question: "According to NICE guidelines, when should antidepressant medication be considered as a first-line treatment for depression rather than psychological therapy alone?",
    options: [
      "For all cases of depression, regardless of severity",
      "Only when the person specifically requests medication",
      "For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants",
      "Antidepressants should never be a first-line treatment",
    ] as const,
    correctAnswer: 2,
    explanation:
      "NICE guidelines recommend that antidepressant medication should be considered as a first-line treatment for moderate to severe depression, particularly when symptoms significantly impair functioning. It may also be considered when the person has a history of recurrent depression and has responded well to antidepressants in the past. For mild depression, guided self-help and low-intensity psychological interventions are typically recommended first.",
    section: "Depression, Anxiety & Stress",
    difficulty: "advanced" as const,
    topic: "NICE stepped care model",
    category: "Depression, Anxiety & Stress" as const,
  },

  // =======================================================================
  // SUBSTANCE MISUSE, SELF-HARM & SUICIDE — 40 questions (id 81–120)
  // =======================================================================

  // ==================== BASIC (16 questions, IDs 81-96) ====================
  {
    id: 81,
    question: "What is the UK Chief Medical Officers' low-risk drinking guideline for adults?",
    options: [
      "No more than 14 units per week, spread over 3 or more days",
      "No more than 21 units per week for men and 14 for women",
      "No more than 10 units per week with at least 2 alcohol-free days",
      "No more than 28 units per week if consumed with meals",
    ] as const,
    correctAnswer: 0,
    explanation:
      "The UK Chief Medical Officers advise that to keep health risks from alcohol low, both men and women should not regularly drink more than 14 units per week. These units should be spread evenly over 3 or more days rather than consumed in one or two sessions.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "UK alcohol guidelines",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 82,
    question: "What is the difference between substance use and substance misuse?",
    options: [
      "There is no difference; the terms are interchangeable",
      "Substance use refers to any consumption, while misuse is use that causes harm or is hazardous",
      "Substance use is legal consumption and misuse is illegal consumption only",
      "Substance misuse only applies to Class A drugs",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Substance use simply refers to the consumption of a substance, which may be entirely legal and non-harmful (e.g. moderate social drinking). Substance misuse refers to use that is harmful, hazardous, or in a way not intended, such as binge drinking, using prescription medication at higher doses than prescribed, or taking illicit drugs.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Substance use vs misuse vs dependency",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 83,
    question: "Which of the following is a common physical sign that someone may be misusing alcohol?",
    options: [
      "Improved concentration at work",
      "Unexplained weight loss or gain, trembling hands, and facial redness",
      "Increased energy levels throughout the day",
      "Better quality of sleep and feeling refreshed",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Physical signs of alcohol misuse can include unexplained weight changes, trembling hands (particularly in the morning), facial redness or broken capillaries, bloodshot eyes, poor personal hygiene, and smelling of alcohol at inappropriate times. These signs may develop gradually and become more noticeable over time.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Alcohol misuse signs and health effects",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 84,
    question: "Approximately how many people die by suicide each year in the UK?",
    options: [
      "Around 1,000",
      "Around 3,000",
      "Around 6,000",
      "Around 12,000",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Approximately 6,000 people die by suicide each year in the UK. This equates to roughly 16 people every day. Suicide is a significant public health concern, and understanding the scale of the problem is important for raising awareness and encouraging people to learn suicide prevention skills.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "UK suicide statistics",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 85,
    question: "Which group is at the highest risk of suicide in the UK?",
    options: [
      "Women aged 45-54",
      "Men aged 45-54, with construction workers having the highest occupational rate",
      "Teenagers aged 13-17",
      "Adults over 75 regardless of gender",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the UK, men account for approximately three-quarters of all suicides. Middle-aged men (aged 45-54) have the highest suicide rate. Among occupations, construction workers have the highest rate of suicide. This is linked to factors including job insecurity, physical demands, a culture of not seeking help, and higher rates of substance use.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "UK suicide statistics",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 86,
    question: "What does the 'T' stand for in the TASC model for responding to someone who may be suicidal?",
    options: [
      "Treat the person with medication",
      "Tell the person you are concerned about them",
      "Test their knowledge of helplines",
      "Take control of the situation immediately",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the TASC model, 'T' stands for 'Tell' — tell the person you are concerned about them. This opens the conversation in a caring, non-judgemental way. The full model is: Tell (express concern), Ask (ask directly about suicide), Safety plan (help create one), Call (contact professional help or emergency services if needed).",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "TASC model",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 87,
    question: "What is the Samaritans' free 24/7 helpline number?",
    options: [
      "0800 58 58 58",
      "116 123",
      "0800 068 4141",
      "85258",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Samaritans can be contacted free of charge, 24 hours a day, 7 days a week on 116 123. They provide a confidential emotional support service for anyone experiencing distress or despair, including suicidal thoughts. You can also email them at jo@samaritans.org.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Key helplines",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 88,
    question: "Which of the following best describes self-harm?",
    options: [
      "Self-harm is always a suicide attempt",
      "Self-harm is when someone deliberately hurts themselves as a way of coping with emotional distress",
      "Self-harm only involves cutting",
      "Self-harm is attention-seeking behaviour that should be ignored",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Self-harm is when someone deliberately hurts themselves as a way of dealing with overwhelming emotional distress, painful memories, or difficult situations. It is not always a suicide attempt — many people who self-harm do not wish to die but are struggling to cope. Self-harm can take many forms beyond cutting, including burning, hitting, poisoning, or other methods.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Self-harm definition, types, prevalence",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 89,
    question: "What is the SHOUT crisis text line number in the UK?",
    options: [
      "116 123",
      "999",
      "85258",
      "0800 068 4141",
    ] as const,
    correctAnswer: 2,
    explanation:
      "SHOUT is the UK's first 24/7 crisis text line. You can text 'SHOUT' to 85258 to be connected with a trained volunteer. It is free on most major networks and is suitable for anyone who is struggling to cope and needs immediate support via text rather than a phone call.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Key helplines",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 90,
    question: "Which of the following is a common myth about suicide?",
    options: [
      "Asking someone directly about suicide can help save their life",
      "People who talk about suicide are just seeking attention and won't actually do it",
      "Suicide can affect anyone regardless of background",
      "Most suicidal people give warning signs",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The belief that people who talk about suicide are 'just seeking attention' is a dangerous myth. In reality, talking about wanting to die or feeling hopeless is often a warning sign that should be taken seriously. Many people who die by suicide have previously expressed suicidal thoughts. Taking all mentions of suicide seriously and responding with care can save lives.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Myths about suicide",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 91,
    question: "What is 'dependency' in the context of substance use?",
    options: [
      "Using a substance recreationally at weekends",
      "A condition where a person feels they need a substance to function normally, with withdrawal symptoms if they stop",
      "Trying a substance for the first time",
      "Using a substance only when prescribed by a doctor",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Dependency (or addiction) is characterised by a compulsive need to use a substance, loss of control over how much is consumed, and experiencing withdrawal symptoms when the substance is not taken. The person may develop tolerance (needing more to get the same effect) and continue using despite harmful consequences to their health, relationships, or work.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Substance use vs misuse vs dependency",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 92,
    question: "When responding to someone who self-harms, which approach is most appropriate?",
    options: [
      "Tell them they must stop self-harming immediately",
      "Ignore it because it is their personal choice",
      "Listen non-judgementally and let them know you care, without insisting they stop",
      "Show them graphic images of self-harm injuries to discourage them",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The most appropriate response is to listen without judgement, express genuine care and concern, and avoid insisting they stop immediately. Demanding that someone stop self-harming can increase their distress and cause them to hide their behaviour. Instead, support them to explore professional help in their own time while ensuring any immediate injuries receive first aid.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Responding to self-harm",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 93,
    question: "What is 'means restriction' in the context of suicide prevention?",
    options: [
      "Restricting someone's access to money to prevent them buying drugs",
      "Reducing access to the means by which people could take their own life",
      "Restricting someone's ability to leave their home",
      "Limiting the amount of media coverage about suicide",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Means restriction is a key suicide prevention strategy that involves reducing access to methods of suicide. Examples include barriers on bridges, blister packs for medication (making it harder to take large quantities quickly), and safe storage of firearms. Research shows that restricting access to means can prevent suicides because suicidal crises are often brief — if someone cannot access a method quickly, the urge may pass.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Means restriction as prevention",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 94,
    question: "Which of the following is a warning sign that someone may be considering suicide?",
    options: [
      "Making plans for the future and setting new goals",
      "Talking about being a burden, giving away possessions, or withdrawing from others",
      "Taking up a new hobby or interest",
      "Asking for a promotion at work",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Warning signs of suicide can include talking about being a burden to others, giving away prized possessions, withdrawing from friends and family, increased use of alcohol or drugs, changes in sleep patterns, expressing hopelessness, and talking about wanting to die. Recognising these signs can be the first step in offering support.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Warning signs of suicide",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 95,
    question: "When should you call 999 for a mental health crisis?",
    options: [
      "Only if the person asks you to call",
      "When there is an immediate risk to life, such as someone about to act on suicidal thoughts or who has seriously harmed themselves",
      "Only if a qualified mental health professional tells you to",
      "Never — mental health crises are not emergencies",
    ] as const,
    correctAnswer: 1,
    explanation:
      "You should call 999 when there is an immediate risk to life. This includes situations where someone has taken an overdose, is about to act on suicidal thoughts, has seriously injured themselves, or is in immediate danger. Mental health crises can be medical emergencies and should be treated with the same urgency as physical emergencies.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "When to call 999 for mental health crisis",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 96,
    question: "Does asking someone directly about suicide increase their risk of acting on it?",
    options: [
      "Yes, it plants the idea in their head",
      "No — research shows that asking directly about suicide does not increase risk and can actually help",
      "Yes, but only if they have a diagnosed mental health condition",
      "It depends on the time of day you ask",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Research consistently shows that asking someone directly about suicide does not increase their risk. In fact, it can reduce distress by showing the person they are not alone and that someone cares. Many people experiencing suicidal thoughts feel relieved when asked, as it gives them permission to talk about their feelings. Being direct — using words like 'suicide' rather than euphemisms — is recommended.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "basic" as const,
    topic: "Asking directly about suicide",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },

  // ==================== INTERMEDIATE (16 questions, IDs 97-112) ====================
  {
    id: 97,
    question: "What is 'dual diagnosis' in mental health?",
    options: [
      "Being diagnosed with two different physical illnesses at the same time",
      "Having both a mental health condition and a substance use disorder simultaneously",
      "Receiving two different opinions from two different doctors",
      "Being diagnosed with the same condition twice by different clinicians",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Dual diagnosis (also called co-occurring disorders or comorbidity) refers to someone who has both a mental health condition (such as depression, anxiety, or psychosis) and a substance use disorder at the same time. The two conditions often interact — substance use can worsen mental health symptoms, and mental health problems can drive substance use as a coping mechanism. Treatment should ideally address both issues together.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Dual diagnosis",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 98,
    question: "What are the six steps of a safety plan for someone experiencing suicidal thoughts?",
    options: [
      "Call 999, go to hospital, take medication, sleep, eat well, exercise",
      "Warning signs, coping strategies, people to contact for distraction, people to ask for help, professionals to contact, making the environment safe",
      "Delete social media, avoid alcohol, go on holiday, change jobs, make new friends, start exercising",
      "Write a letter, tell your GP, call Samaritans, avoid being alone, take medication, rest",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The six steps of a safety plan are: (1) Recognising personal warning signs that a crisis may be developing, (2) Internal coping strategies the person can use themselves, (3) People and social settings that can provide distraction, (4) People the person can ask for help, (5) Professionals and agencies to contact in a crisis, and (6) Making the environment safe by reducing access to means. A safety plan is personalised and created collaboratively.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Safety planning",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 99,
    question: "Which of the following best describes how cannabis can affect mental health?",
    options: [
      "Cannabis has no effect on mental health whatsoever",
      "Cannabis only affects physical health, not mental health",
      "Regular cannabis use, particularly high-strength varieties, is linked to increased risk of anxiety, depression, and psychosis",
      "Cannabis always improves mental health by reducing stress",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Regular cannabis use, especially high-strength (high-THC) varieties like skunk, is associated with an increased risk of developing mental health problems including anxiety, depression, and psychosis. The risk is higher for those who start using in adolescence, use frequently, and have a family history of mental illness. While some people use cannabis to cope with stress, it can ultimately worsen mental health outcomes.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Drug misuse",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 100,
    question: "A colleague confides that they have been drinking heavily every evening to cope with stress at work. What is the most appropriate initial response?",
    options: [
      "Report them to management immediately",
      "Tell them they are being irresponsible and must stop drinking",
      "Thank them for telling you, listen without judgement, and gently suggest they speak to their GP or contact a support service",
      "Ignore it because what they do outside work is their own business",
    ] as const,
    correctAnswer: 2,
    explanation:
      "When someone discloses substance misuse, the best initial response is to thank them for their trust, listen non-judgementally, express concern for their wellbeing, and gently suggest professional support such as their GP, occupational health, or services like Drinkline (0300 123 1110). Avoid being critical or dismissive, as this may discourage them from seeking help.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Approaching someone about substance use",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 101,
    question: "Why might someone self-harm even when they have no intention of ending their life?",
    options: [
      "Self-harm is always linked to suicidal intent",
      "They may use self-harm to cope with overwhelming emotions, to feel in control, to express distress they cannot put into words, or to feel something when emotionally numb",
      "People who self-harm without suicidal intent are doing it for attention only",
      "Self-harm without suicidal intent is not considered a real mental health concern",
    ] as const,
    correctAnswer: 1,
    explanation:
      "People self-harm for many reasons that are not about wanting to die. Common reasons include managing overwhelming emotional pain, feeling a sense of control, expressing distress that is hard to verbalise, punishing themselves, feeling something when emotionally numb, or coping with trauma. While self-harm and suicide are linked (self-harm is a risk factor for suicide), many people who self-harm are not suicidal — they are trying to cope with life, not end it.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Why people self-harm",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 102,
    question: "What risks are associated with benzodiazepine misuse?",
    options: [
      "Benzodiazepines are completely safe and carry no risks",
      "Physical dependence can develop quickly, withdrawal can be dangerous, and combining them with alcohol or opioids can be fatal",
      "The only risk is mild drowsiness",
      "Benzodiazepines can only be harmful if injected",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Benzodiazepines (such as diazepam/Valium) carry significant risks when misused. Physical dependence can develop within weeks of regular use, and sudden withdrawal can cause seizures and be life-threatening. Combining benzodiazepines with other depressants like alcohol or opioids is particularly dangerous as it can lead to respiratory depression and death. They also impair judgement, coordination, and memory.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Drug misuse",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 103,
    question: "Which of the following is a protective factor against suicide?",
    options: [
      "Social isolation and loneliness",
      "Easy access to lethal means",
      "Strong social connections, a sense of belonging, and reasons for living",
      "Previous suicide attempts",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Protective factors are characteristics or conditions that reduce the likelihood of suicide. They include strong social connections and a sense of belonging, having reasons for living (e.g. family, faith, pets), access to mental health support, effective coping skills, restricted access to means, and cultural or religious beliefs that discourage suicide. Building protective factors is an important part of suicide prevention.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Risk factors and protective factors for suicide",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 104,
    question: "What does the 'A' stand for in the TASC model?",
    options: [
      "Assess their medication",
      "Ask directly about suicide",
      "Avoid talking about feelings",
      "Arrange transport to hospital",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the TASC model, 'A' stands for 'Ask' — ask directly about suicide. This means using clear, direct language such as 'Are you thinking about suicide?' rather than vague questions. Research shows that asking directly does not increase risk and can open a vital conversation. Being direct shows you take their feelings seriously and creates space for honest discussion.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "TASC model",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 105,
    question: "What is the Papyrus HOPELINEUK helpline, and who is it for?",
    options: [
      "A helpline for adults over 65 experiencing loneliness, on 0800 068 4141",
      "A helpline for anyone under 35 who is experiencing thoughts of suicide, on 0800 068 4141",
      "A helpline for parents of children with ADHD, on 116 123",
      "A helpline exclusively for medical professionals, on 0800 58 58 58",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Papyrus HOPELINEUK (0800 068 4141) is a specialist helpline for children and young people under 35 who are experiencing thoughts of suicide, and for anyone concerned about a young person. It is staffed by trained advisors who can provide support, practical advice, and information. They can also be contacted by text (07860 039967) or email (pat@papyrus-uk.org).",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Key helplines",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 106,
    question: "What are the key elements of a workplace drug and alcohol policy?",
    options: [
      "It only needs to state that drugs are illegal",
      "It should include the organisation's position, rules, support available, testing procedures (if applicable), and consequences of policy breaches",
      "It only needs to cover illegal drugs, not alcohol",
      "It is only relevant for safety-critical industries",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A comprehensive workplace drug and alcohol policy should include: the organisation's position on substance use at work, clear rules about acceptable behaviour, details of support available (e.g. employee assistance programmes, occupational health), testing procedures if applicable, consequences for breaching the policy, and how confidentiality is handled. It should balance welfare support with safety responsibilities and apply to all employees.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Workplace drug and alcohol policies",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 107,
    question: "Which of the following is a risk factor for suicide?",
    options: [
      "Having a large social network",
      "Regular physical exercise",
      "Previous suicide attempts, mental health conditions, substance misuse, and social isolation",
      "Strong religious or cultural beliefs",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Risk factors for suicide include previous suicide attempts (the strongest single predictor), mental health conditions (especially depression, bipolar disorder, and schizophrenia), substance misuse, social isolation and loneliness, relationship breakdown, bereavement, financial problems, chronic pain or illness, exposure to others' suicide, and access to lethal means. Multiple risk factors often combine, and risk can change over time.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Risk factors and protective factors for suicide",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 108,
    question: "What should you do if you discover someone has self-harmed and has an open wound?",
    options: [
      "Ignore the wound and only discuss their emotional state",
      "Apply basic first aid (clean the wound, apply pressure if bleeding, cover with a clean dressing) and encourage them to seek medical attention if needed",
      "Take photographs of the injury to show their doctor later",
      "Tell them the wound is not serious enough to worry about",
    ] as const,
    correctAnswer: 1,
    explanation:
      "If someone has an open wound from self-harm, provide basic first aid: apply pressure with a clean cloth if actively bleeding, clean the wound gently, and cover with a clean dressing. Encourage them to seek medical attention if the wound is deep, won't stop bleeding, or shows signs of infection. Treat them with the same care and compassion you would anyone with an injury, without judgement about how it occurred.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "First aid for self-harm injuries",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 109,
    question: "What are the long-term health effects of heavy alcohol misuse?",
    options: [
      "Heavy alcohol misuse has no long-term health effects if the person is otherwise healthy",
      "Liver disease, heart disease, brain damage, increased cancer risk, pancreatitis, and mental health problems",
      "Only liver damage; other organs are not affected",
      "Long-term effects are limited to weight gain",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Long-term heavy alcohol misuse can cause serious damage to multiple organ systems. This includes liver disease (fatty liver, hepatitis, cirrhosis), cardiovascular disease, brain damage and cognitive impairment, increased risk of several cancers (mouth, throat, liver, breast, bowel), pancreatitis, weakened immune system, and mental health problems including depression and anxiety. It can also contribute to relationship breakdown and social problems.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Alcohol misuse signs and health effects",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 110,
    question: "What does the 'S' stand for in the TASC model?",
    options: [
      "Send them home to rest",
      "Safety plan — help them create a plan to keep safe",
      "Sedate the person to prevent harm",
      "Search their belongings for dangerous items",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the TASC model, 'S' stands for 'Safety plan' — help the person create a safety plan. This involves working with them to identify warning signs, coping strategies, supportive people they can contact, professional help available, and steps to make their environment safer. A safety plan is a collaborative, personalised document that gives the person practical steps to follow when they feel at risk.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "TASC model",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 111,
    question: "CALM (Campaign Against Living Miserably) provides a helpline for whom, and what is the number?",
    options: [
      "Women experiencing postnatal depression — 0800 068 4141",
      "Men who are feeling low or suicidal — 0800 58 58 58",
      "Children experiencing bullying — 116 123",
      "People with eating disorders — 85258",
    ] as const,
    correctAnswer: 1,
    explanation:
      "CALM (Campaign Against Living Miserably) runs a helpline on 0800 58 58 58, available from 5pm to midnight every day. While CALM's focus has historically been on men (reflecting the disproportionate male suicide rate), their services are available to anyone who needs support. They also offer a webchat service through their website.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Key helplines",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 112,
    question: "What are the risks associated with prescription opioid misuse?",
    options: [
      "Prescription opioids are completely safe because they are prescribed by a doctor",
      "The only risk is mild constipation",
      "Tolerance, physical dependence, overdose (especially when combined with alcohol or benzodiazepines), and respiratory depression",
      "Prescription opioids carry no risk of addiction",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Prescription opioids (such as codeine, tramadol, morphine, and fentanyl) carry significant risks when misused. Tolerance develops quickly, meaning higher doses are needed for the same effect. Physical dependence can lead to withdrawal symptoms. Overdose risk is serious, particularly when opioids are combined with alcohol, benzodiazepines, or other depressants, as this can cause fatal respiratory depression. The UK has seen rising rates of opioid-related deaths.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "intermediate" as const,
    topic: "Drug misuse",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },

  // ==================== ADVANCED (8 questions, IDs 113-120) ====================
  {
    id: 113,
    question:
      "A construction worker who has recently separated from his partner begins turning up to site smelling of alcohol and withdrawing from colleagues. Using the TASC model, which of the following represents the most appropriate sequence of actions?",
    options: [
      "Ignore the situation as it is a personal matter, then report him if his work suffers",
      "Tell him you've noticed changes and you're worried, ask directly if he's having thoughts of suicide, offer to help him make a safety plan, and call professional support if needed",
      "Immediately call 999 as construction workers are at the highest risk of suicide",
      "Send him home from site without discussing your concerns and email HR",
    ] as const,
    correctAnswer: 1,
    explanation:
      "This scenario combines multiple risk factors: male gender, construction industry, relationship breakdown, substance use, and social withdrawal. The TASC model provides a structured response: Tell — express genuine concern about the changes you've noticed; Ask — ask directly if he is thinking about suicide; Safety plan — if he is struggling, help him identify coping strategies and support; Call — contact professional help (GP, Samaritans 116 123, or 999 if in immediate danger). Early intervention in such cases can be life-saving.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "TASC model",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 114,
    question:
      "A colleague with a known history of depression tells you they have been stockpiling their prescribed medication 'just in case'. What is the most appropriate response?",
    options: [
      "Respect their privacy and don't mention it to anyone",
      "Tell them that stockpiling medication is wasteful and they should return it to the pharmacy",
      "Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping",
      "Assume they are being cautious about future prescription shortages",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Stockpiling medication is a significant warning sign that someone may be planning a suicide attempt. The appropriate response involves: taking it seriously and not dismissing it, asking directly about suicidal thoughts, encouraging disclosure to a professional, and applying means restriction — suggesting they give excess medication to a trusted person, return it to a pharmacy, or have someone else manage their medication. Means restriction is one of the most effective suicide prevention strategies, as it removes access during a crisis.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Means restriction as prevention",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 115,
    question:
      "A person experiencing dual diagnosis (alcohol dependency and severe depression) is being discharged from an inpatient unit. Which of the following post-crisis support plans is most comprehensive?",
    options: [
      "Simply giving them a leaflet about local AA meetings",
      "A coordinated plan including continued mental health support, substance misuse treatment, a safety plan, GP follow-up within 48 hours, social support networks, and regular monitoring of both conditions",
      "Advising them to stop drinking and their depression will resolve",
      "Scheduling a single follow-up appointment in 6 months",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Post-crisis support for dual diagnosis requires a comprehensive, integrated approach that addresses both conditions simultaneously. Best practice includes: follow-up within 48 hours of discharge (a high-risk period), continued treatment for both the mental health condition and substance use disorder, a personalised safety plan, regular GP contact, engagement with community mental health services and substance misuse services, social support, and monitoring of both conditions. Treating only one condition significantly increases the risk of relapse in the other.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Post-crisis support",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 116,
    question:
      "Research indicates that the period immediately after discharge from psychiatric hospital is one of the highest-risk times for suicide. Which of the following time frames carries the greatest risk?",
    options: [
      "6-12 months after discharge",
      "The first 1-2 weeks after discharge",
      "3-6 months after discharge",
      "The risk is evenly distributed across the first year",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Research consistently shows that the first 1-2 weeks following discharge from psychiatric hospital is the period of highest suicide risk. This is why best practice guidelines recommend follow-up contact within 48 hours of discharge and close monitoring during this critical period. Risk factors during this time include the transition from a supported environment to independence, potential gaps in community services, medication changes, and return to triggering life circumstances.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Post-crisis support",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 117,
    question:
      "Cocaine use can have serious effects on both physical and mental health. Which of the following accurately describes the combined physical and psychological risks?",
    options: [
      "Cocaine only causes short-term euphoria with no lasting effects",
      "Cocaine increases the risk of heart attack, stroke, and seizures; psychologically it can cause paranoia, anxiety, aggression, and depression during withdrawal, with a high potential for psychological dependency",
      "Cocaine is physically addictive but has no mental health effects",
      "Cocaine is only dangerous if injected",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cocaine carries serious physical risks including heart attack (even in young, healthy people), stroke, seizures, and cardiac arrhythmias due to its stimulant effects on the cardiovascular system. Psychologically, it can cause intense paranoia, anxiety, aggression, and psychotic symptoms during use, and severe depression, fatigue, and cravings during withdrawal ('comedown'). It has a high potential for psychological dependency. Mixing cocaine with alcohol creates cocaethylene in the liver, which is more toxic than either substance alone.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Drug misuse",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 118,
    question:
      "When developing a safety plan with someone who has disclosed suicidal thoughts, what is the correct order of the six steps?",
    options: [
      "Professionals to contact, making environment safe, warning signs, coping strategies, people for distraction, people to ask for help",
      "Warning signs, internal coping strategies, people and social settings for distraction, people to ask for help, professionals and agencies to contact, making the environment safe",
      "Making the environment safe, calling 999, warning signs, coping strategies, people for help, professionals to contact",
      "Coping strategies, warning signs, making the environment safe, professionals to contact, people for help, people for distraction",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The correct order of the six steps in a safety plan is: (1) Warning signs — recognising personal triggers and early signs of crisis; (2) Internal coping strategies — things the person can do alone to manage the crisis; (3) People and social settings for distraction — places to go and people who can take their mind off things; (4) People to ask for help — trusted individuals they can talk to openly; (5) Professionals and agencies to contact — helplines, crisis teams, GPs; (6) Making the environment safe — removing or restricting access to means. The sequence moves from self-management to increasingly intensive levels of support.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Safety planning",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 119,
    question:
      "A young person has been self-harming through cutting for several months. They tell you it helps them cope with emotional pain from past trauma. They are not suicidal but are reluctant to seek help. What is the most therapeutically informed response?",
    options: [
      "Tell them they must stop cutting immediately or you will tell their parents",
      "Acknowledge that self-harm is currently helping them cope, validate their emotional pain, explore whether they would be open to learning alternative coping strategies over time, and gently encourage them to speak to a professional such as a counsellor when they feel ready",
      "Ignore the self-harm since they say they are not suicidal",
      "Show them graphic images of infected self-harm wounds to frighten them into stopping",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The most therapeutically informed approach recognises that self-harm is serving a function — it is the person's current coping mechanism for overwhelming emotional pain. Demanding they stop without offering alternatives can increase distress and remove their only coping strategy. Best practice involves: validating their experience, acknowledging the pain that drives the self-harm, not insisting they stop immediately, exploring readiness for alternative coping strategies (such as holding ice, exercise, journaling, or grounding techniques), ensuring any wounds receive first aid, and gently encouraging professional support when they feel ready. Maintaining the relationship and trust is paramount.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Responding to self-harm",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },
  {
    id: 120,
    question:
      "In the context of suicide prevention, which of the following statements about the relationship between self-harm and suicide is most accurate?",
    options: [
      "Self-harm and suicide are the same thing",
      "Self-harm has no connection to suicide risk",
      "While self-harm is not always a suicide attempt, it is one of the strongest risk factors for future suicide; approximately 50% of people who die by suicide have a history of self-harm",
      "Only self-harm involving medication overdose increases suicide risk",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The relationship between self-harm and suicide is complex but significant. Self-harm is one of the strongest known risk factors for future suicide — research shows that approximately half of people who die by suicide have a history of self-harm. However, it is crucial to understand that most people who self-harm are not suicidal at the time. The risk increases with repeated self-harm, escalating severity, use of more lethal methods, co-occurring mental health conditions, and substance use. This is why all self-harm should be taken seriously and met with compassionate, non-judgemental support, even when the person states they are not suicidal.",
    section: "Substance Misuse, Self-Harm & Suicide",
    difficulty: "advanced" as const,
    topic: "Self-harm definition, types, prevalence",
    category: "Substance Misuse, Self-Harm & Suicide" as const,
  },

  // =======================================================================
  // PSYCHOSIS, EATING DISORDERS & COMPLEX NEEDS — 40 questions (id 121–160)
  // =======================================================================

  // ============================================================
  // BASIC (16 questions, IDs 121–136)
  // ============================================================
  {
    id: 121,
    question: "What is psychosis?",
    options: [
      "A loss of contact with reality",
      "A type of personality disorder",
      "A mild form of anxiety",
      "A learning disability",
    ] as const,
    correctAnswer: 0,
    explanation:
      "Psychosis is defined as a loss of contact with reality. The person may experience hallucinations, delusions, or disordered thinking that significantly impair their ability to distinguish what is real from what is not.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Psychosis definition",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 122,
    question: "What is the most common type of hallucination experienced during psychosis?",
    options: [
      "Visual hallucinations",
      "Auditory hallucinations",
      "Tactile hallucinations",
      "Olfactory hallucinations",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Auditory hallucinations — hearing voices or sounds that others cannot hear — are the most common type of hallucination experienced during psychosis. While visual, tactile, and olfactory hallucinations also occur, they are less frequent.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Hallucinations",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 123,
    question: "What is a delusion?",
    options: [
      "A sensory experience without an external source",
      "A fixed, false belief held despite evidence to the contrary",
      "A temporary lapse in memory",
      "A side effect of medication",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A delusion is a fixed, false belief that is held with conviction despite clear evidence to the contrary. Delusions can be paranoid (believing others intend harm), grandiose (believing one has special powers), or referential (believing unrelated events have personal significance).",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Delusions",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 124,
    question: "Approximately how many people does schizophrenia affect?",
    options: [
      "1 in 10",
      "1 in 1,000",
      "1 in 100",
      "1 in 50",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Schizophrenia affects approximately 1 in 100 people. It is a serious mental health condition that can cause hallucinations, delusions, and disordered thinking, and typically has its onset in the late teens to early 30s.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Schizophrenia",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 125,
    question: "Which of the following is the best approach when supporting someone who is experiencing psychosis?",
    options: [
      "Argue with their delusions to help them see reality",
      "Stay calm, speak gently, and do not argue with their delusions",
      "Ignore them until the episode passes",
      "Raise your voice so they can focus on what you are saying",
    ] as const,
    correctAnswer: 1,
    explanation:
      "When supporting someone experiencing psychosis, you should stay calm, speak gently, and avoid arguing with their delusions. Arguing can increase distress and agitation. Instead, acknowledge their feelings and focus on keeping them safe.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Supporting someone experiencing psychosis",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 126,
    question: "Which category of mental health condition has the highest mortality rate?",
    options: [
      "Anxiety disorders",
      "Eating disorders",
      "Personality disorders",
      "Mood disorders",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Eating disorders have the highest mortality rate of any mental health condition. This is due to the severe physical health complications they cause, including heart failure, organ damage, and suicide risk.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Eating disorders",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 127,
    question: "What is anorexia nervosa primarily characterised by?",
    options: [
      "Binge eating followed by purging",
      "Restricting food intake leading to significantly low body weight",
      "Eating large quantities of food very quickly",
      "Only eating certain colours of food",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Anorexia nervosa is primarily characterised by restricting food intake, leading to significantly low body weight, an intense fear of gaining weight, and a distorted perception of body shape or weight.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Anorexia nervosa",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 128,
    question: "What is the BEAT helpline number for eating disorder support?",
    options: [
      "0800 123 4567",
      "0808 801 0677",
      "116 123",
      "0300 304 7000",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The BEAT helpline number is 0808 801 0677. BEAT is the UK's leading eating disorder charity, providing support and information for anyone affected by eating disorders.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "BEAT helpline",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 129,
    question: "What does the trauma-informed question 'What happened to you?' replace?",
    options: [
      "'Why are you here?'",
      "'What's wrong with you?'",
      "'How can I help you?'",
      "'When did this start?'",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A trauma-informed approach replaces 'What's wrong with you?' with 'What happened to you?' This shift recognises that many behaviours and difficulties are responses to traumatic experiences rather than inherent flaws in the person.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Trauma-informed approach",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 130,
    question: "What does PTSD stand for?",
    options: [
      "Pre-Traumatic Stress Disorder",
      "Post-Traumatic Stress Disorder",
      "Persistent Tension and Stress Disorder",
      "Personal Trauma and Stress Diagnosis",
    ] as const,
    correctAnswer: 1,
    explanation:
      "PTSD stands for Post-Traumatic Stress Disorder. It is a mental health condition that can develop after experiencing or witnessing a traumatic event, and is characterised by four main symptom clusters: re-experiencing, avoidance, hyperarousal, and negative cognitions and mood.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "PTSD",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 131,
    question: "Which two substances are most commonly associated with drug-induced psychosis?",
    options: [
      "Alcohol and tobacco",
      "Cannabis and amphetamines",
      "Caffeine and paracetamol",
      "Heroin and benzodiazepines",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Cannabis and amphetamines are the substances most commonly associated with drug-induced psychosis. Both can trigger psychotic symptoms including hallucinations and delusions, particularly with heavy or prolonged use.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Drug-induced psychosis",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 132,
    question: "What does 'person-first language' mean in the context of mental health?",
    options: [
      "Always referring to the person before their condition, e.g. 'a person with schizophrenia' rather than 'a schizophrenic'",
      "Letting the person speak first in any conversation",
      "Putting the person's name at the start of medical notes",
      "Ensuring the person is the first to be treated in a group setting",
    ] as const,
    correctAnswer: 0,
    explanation:
      "Person-first language means referring to the person before their condition — for example, 'a person with schizophrenia' rather than 'a schizophrenic'. This avoids reducing someone to a diagnostic label and respects their identity beyond their mental health condition.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Person-first language",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 133,
    question: "What does ACE stand for in the context of trauma and mental health?",
    options: [
      "Acute Clinical Episode",
      "Adverse Childhood Experience",
      "Advanced Care Evaluation",
      "Assisted Community Engagement",
    ] as const,
    correctAnswer: 1,
    explanation:
      "ACE stands for Adverse Childhood Experience. ACEs are potentially traumatic events that occur during childhood, such as abuse, neglect, or household dysfunction. Research shows a strong link between ACEs and poorer mental and physical health outcomes in adulthood.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Adverse Childhood Experiences (ACEs)",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 134,
    question: "What is bulimia nervosa primarily characterised by?",
    options: [
      "Consistently refusing all food and drink",
      "Cycles of binge eating followed by compensatory behaviours such as purging",
      "Eating only one meal per day",
      "An allergy-driven avoidance of certain foods",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Bulimia nervosa is characterised by repeated cycles of binge eating (consuming large amounts of food in a short period with a sense of loss of control) followed by compensatory behaviours such as self-induced vomiting, laxative misuse, or excessive exercise.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Bulimia nervosa",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 135,
    question: "At what typical age range does schizophrenia most commonly first appear?",
    options: [
      "Early childhood (ages 3–7)",
      "Late teens to early 30s",
      "Middle age (ages 45–55)",
      "Older adulthood (ages 65+)",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Schizophrenia most commonly has its onset in the late teens to early 30s. Men tend to develop it slightly earlier than women. Early detection and treatment through Early Intervention in Psychosis (EIP) services can significantly improve outcomes.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "Schizophrenia",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 136,
    question: "Which of the following is a key feature of BPD (Borderline Personality Disorder), also known as EUPD?",
    options: [
      "Persistent auditory hallucinations",
      "An intense fear of abandonment",
      "A preference for solitary activities",
      "An inability to feel any emotions",
    ] as const,
    correctAnswer: 1,
    explanation:
      "An intense fear of abandonment is a key feature of BPD/EUPD. Other core features include emotional instability, impulsive behaviour, unstable relationships, and a higher risk of self-harm. A trauma-informed approach is essential when supporting someone with BPD/EUPD.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "basic" as const,
    topic: "BPD/EUPD features",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },

  // ============================================================
  // INTERMEDIATE (16 questions, IDs 137–152)
  // ============================================================
  {
    id: 137,
    question: "A colleague on site tells you that the news reader on TV was sending him coded messages last night. What type of delusion is this most likely an example of?",
    options: [
      "Grandiose delusion",
      "Paranoid delusion",
      "Referential delusion",
      "Somatic delusion",
    ] as const,
    correctAnswer: 2,
    explanation:
      "This is a referential delusion — the belief that unrelated events, objects, or people have special personal significance or are communicating directly with the person. Believing a TV presenter is sending coded messages is a classic example of referential thinking.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Delusions",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 138,
    question: "What is 'first episode psychosis' and why is early intervention important?",
    options: [
      "The first time someone takes antipsychotic medication; early intervention reduces side effects",
      "The first time someone experiences psychotic symptoms; early intervention leads to significantly better long-term outcomes",
      "The first time someone is admitted to hospital; early intervention prevents readmission",
      "The first time a family member notices unusual behaviour; early intervention prevents family breakdown",
    ] as const,
    correctAnswer: 1,
    explanation:
      "First episode psychosis refers to the first time someone experiences psychotic symptoms such as hallucinations or delusions. Early intervention through specialist Early Intervention in Psychosis (EIP) services is critical because research shows it leads to significantly better long-term outcomes, including reduced symptom severity and improved quality of life.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "First episode psychosis",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 139,
    question: "Which of the following is NOT one of the four main symptom clusters of PTSD?",
    options: [
      "Re-experiencing the traumatic event",
      "Avoidance of reminders of the trauma",
      "Hyperarousal and heightened startle response",
      "Grandiose thinking and inflated self-esteem",
    ] as const,
    correctAnswer: 3,
    explanation:
      "The four main symptom clusters of PTSD are: re-experiencing (flashbacks, nightmares), avoidance (avoiding reminders of the trauma), hyperarousal (heightened startle response, difficulty sleeping, irritability), and negative cognitions and mood (persistent negative beliefs, emotional numbness). Grandiose thinking is not a PTSD symptom — it is associated with mania or certain types of delusion.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "PTSD",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 140,
    question: "What does OSFED stand for and what does it describe?",
    options: [
      "Other Specified Feeding or Eating Disorder — an eating disorder that does not meet the full criteria for anorexia, bulimia, or binge eating disorder",
      "Ongoing Severe Feeding and Eating Dysfunction — a chronic condition requiring tube feeding",
      "Occasional Stress-related Food and Eating Disturbance — emotional eating during stressful periods",
      "Obsessive Selective Food and Eating Disorder — only eating a very narrow range of foods",
    ] as const,
    correctAnswer: 0,
    explanation:
      "OSFED stands for Other Specified Feeding or Eating Disorder. It describes eating disorders that cause significant distress but do not meet the full diagnostic criteria for anorexia nervosa, bulimia nervosa, or binge eating disorder. OSFED is just as serious and can be just as life-threatening as other eating disorders.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "OSFED",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 141,
    question: "Why are eating disorders in men, particularly in the construction industry, often underdiagnosed?",
    options: [
      "Men cannot develop eating disorders",
      "Stigma, masculine norms, and the misconception that eating disorders only affect women make men less likely to seek help",
      "Construction workers burn too many calories to develop eating disorders",
      "Eating disorders in men present with completely different symptoms that doctors cannot recognise",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Eating disorders in men are often underdiagnosed because of stigma, traditional masculine norms that discourage vulnerability, and the widespread misconception that eating disorders only affect women. In the construction industry, the physically demanding culture and 'tough' image can make it even harder for men to recognise or disclose disordered eating patterns.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Eating disorders in men and construction",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 142,
    question: "Which of the following is a serious physical health risk associated with eating disorders?",
    options: [
      "Improved cardiovascular fitness",
      "Heart failure due to electrolyte imbalances",
      "Increased bone density",
      "Enhanced immune system function",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Heart failure due to electrolyte imbalances is one of the most serious physical health risks of eating disorders. Other risks include osteoporosis, kidney damage, dental erosion (from purging), muscle wasting, and hormonal disruption. These physical consequences are a key reason eating disorders have the highest mortality rate of any mental health condition.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Physical health risks of eating disorders",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 143,
    question: "What distinguishes Complex PTSD from standard PTSD according to ICD-11?",
    options: [
      "Complex PTSD only occurs after military combat",
      "Complex PTSD includes all PTSD symptoms plus difficulties with emotional regulation, self-concept, and relationships",
      "Complex PTSD is a milder form of PTSD that resolves on its own",
      "Complex PTSD is caused by a single traumatic event rather than repeated trauma",
    ] as const,
    correctAnswer: 1,
    explanation:
      "According to ICD-11, Complex PTSD includes all the core symptoms of PTSD (re-experiencing, avoidance, hyperarousal, negative cognitions) plus additional features: difficulties with emotional regulation, a persistently negative or disrupted sense of self, and difficulties sustaining relationships. It typically results from prolonged or repeated trauma, such as childhood abuse or domestic violence.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Complex PTSD (ICD-11)",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 144,
    question: "A construction worker witnessed a fatal accident on site six months ago. He now avoids the area where it happened, has recurring nightmares, and feels constantly on edge. What condition might he be experiencing?",
    options: [
      "Generalised anxiety disorder",
      "Post-Traumatic Stress Disorder (PTSD)",
      "Obsessive-compulsive disorder",
      "Social anxiety disorder",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The symptoms described — avoidance of trauma-related locations, recurring nightmares (re-experiencing), and feeling constantly on edge (hyperarousal) — are classic symptoms of PTSD. Trauma in construction, including witnessing accidents and injuries, is a significant risk factor for developing PTSD in this industry.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Trauma in construction",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 145,
    question: "What is emotional dysregulation?",
    options: [
      "The inability to feel any emotions at all",
      "Difficulty managing or controlling emotional responses, leading to intense or rapidly shifting emotions",
      "A conscious decision to suppress emotions in the workplace",
      "Feeling happy most of the time regardless of circumstances",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Emotional dysregulation refers to difficulty managing or controlling emotional responses. This can result in emotions that feel extremely intense, shift rapidly, or seem disproportionate to the situation. It is a core feature of BPD/EUPD and is often linked to traumatic experiences, particularly adverse childhood experiences (ACEs).",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Emotional dysregulation",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 146,
    question: "What are the three main types of trauma?",
    options: [
      "Physical, emotional, and financial",
      "Single-incident, complex (repeated), and vicarious",
      "Childhood, adolescent, and adult",
      "Mild, moderate, and severe",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The three main types of trauma are: single-incident trauma (one traumatic event, such as an accident), complex trauma (repeated or prolonged trauma, such as ongoing abuse), and vicarious trauma (trauma experienced indirectly by witnessing or hearing about others' traumatic experiences). Construction workers may experience all three types.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Trauma types",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 147,
    question: "What is a paranoid delusion?",
    options: [
      "A belief that one has special powers or abilities",
      "A belief that unrelated events are personally significant",
      "A belief that others are plotting to harm, deceive, or persecute you",
      "A belief that one's body is malfunctioning or diseased",
    ] as const,
    correctAnswer: 2,
    explanation:
      "A paranoid delusion is a fixed, false belief that others are plotting to harm, deceive, or persecute you. It is one of the most common types of delusion experienced during psychosis. A grandiose delusion (option A) involves beliefs about special powers, while a referential delusion (option B) involves believing unrelated events are personally significant.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Delusions",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 148,
    question: "What is binge eating disorder?",
    options: [
      "Eating slightly more than usual at mealtimes",
      "Regularly eating large quantities of food very quickly to the point of discomfort, with a feeling of loss of control, without compensatory purging",
      "Choosing to eat a large meal after a period of dieting",
      "Eating quickly because of a busy work schedule",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Binge eating disorder involves regularly consuming large quantities of food very quickly, to the point of physical discomfort, accompanied by a sense of loss of control. Unlike bulimia nervosa, it does not involve compensatory behaviours such as purging. It causes significant distress and can lead to serious physical health problems.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Binge eating disorder",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 149,
    question: "What is vicarious trauma and who might be at risk of it on a construction site?",
    options: [
      "Trauma from a direct personal injury; only the injured person is at risk",
      "Trauma experienced indirectly through witnessing or hearing about others' traumatic experiences; first aiders, supervisors, and colleagues may be at risk",
      "Trauma caused by excessive noise on site; all workers are equally at risk",
      "Trauma from financial difficulties; only self-employed workers are at risk",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Vicarious trauma is trauma experienced indirectly through witnessing or hearing about others' traumatic experiences. On a construction site, first aiders who attend to injured colleagues, supervisors who manage incident responses, and colleagues who witness accidents may all be at risk of vicarious trauma.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Trauma in construction",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 150,
    question: "Which of the following best describes the purpose of Early Intervention in Psychosis (EIP) services?",
    options: [
      "Providing long-term residential care for people with chronic psychosis",
      "Offering rapid, specialist support during the first episode of psychosis to improve long-term outcomes",
      "Prescribing medication only, without any talking therapy",
      "Supporting family members but not the person experiencing psychosis directly",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Early Intervention in Psychosis (EIP) services provide rapid, specialist, multidisciplinary support to people experiencing their first episode of psychosis. The aim is to intervene early to reduce symptom severity, prevent relapse, and significantly improve long-term outcomes. EIP teams typically offer a combination of medication, talking therapies, family support, and practical help.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Early Intervention in Psychosis services",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 151,
    question: "A colleague with BPD/EUPD becomes very upset after a minor disagreement with a workmate and threatens to walk off site. What is the most helpful response?",
    options: [
      "Tell them they are overreacting and to get back to work",
      "Remain calm, validate their feelings without judgement, and help them find a safe way to manage the situation",
      "Ignore the situation as it will resolve itself",
      "Report them to management immediately for threatening to leave site",
    ] as const,
    correctAnswer: 1,
    explanation:
      "People with BPD/EUPD can experience emotional dysregulation, meaning their emotional responses may seem intense or disproportionate. The most helpful response is to remain calm, validate their feelings without judgement (a trauma-informed approach), and support them in finding a safe way to manage the situation. Dismissing their feelings or punishing them is likely to escalate distress.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "BPD/EUPD features",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 152,
    question: "What type of hallucination involves feeling sensations on the skin, such as crawling insects, when nothing is there?",
    options: [
      "Auditory hallucination",
      "Olfactory hallucination",
      "Tactile hallucination",
      "Visual hallucination",
    ] as const,
    correctAnswer: 2,
    explanation:
      "A tactile hallucination involves feeling physical sensations — such as crawling, tingling, or pressure — when there is no external stimulus. Feeling insects crawling on the skin (formication) is a well-known example. Tactile hallucinations can occur in psychosis and are also associated with substance use, particularly stimulant drugs.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "intermediate" as const,
    topic: "Hallucinations",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },

  // ============================================================
  // ADVANCED (8 questions, IDs 153–160)
  // ============================================================
  {
    id: 153,
    question: "According to NICE guidelines, what are the two recommended first-line psychological treatments for PTSD in adults?",
    options: [
      "Mindfulness-based cognitive therapy and psychodynamic therapy",
      "Trauma-focused CBT and Eye Movement Desensitisation and Reprocessing (EMDR)",
      "Interpersonal therapy and group counselling",
      "Hypnotherapy and art therapy",
    ] as const,
    correctAnswer: 1,
    explanation:
      "NICE guidelines recommend trauma-focused Cognitive Behavioural Therapy (CBT) and Eye Movement Desensitisation and Reprocessing (EMDR) as the two first-line psychological treatments for PTSD in adults. Both are evidence-based approaches that help people process traumatic memories and reduce PTSD symptoms.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "NICE guidelines for PTSD treatment",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 154,
    question: "A site manager learns that a worker has been diagnosed with schizophrenia but is stable on medication and performing well. A colleague suggests the worker should be removed from duties involving heights due to their diagnosis alone. What is the correct response?",
    options: [
      "Immediately remove the worker from all duties as a precaution",
      "Recognise that a diagnosis alone does not determine fitness for work; decisions should be based on individual risk assessment and occupational health advice, not labels",
      "Ask the worker to disclose their full medical history to the team",
      "Agree with the colleague, as schizophrenia always impairs concentration",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A mental health diagnosis alone does not determine someone's fitness for work. Decisions must be based on individual risk assessment and occupational health guidance, considering the person's current functioning, not a diagnostic label. Many people with schizophrenia work safely and effectively when well-supported. Blanket exclusions based on diagnosis are discriminatory and contrary to person-first, non-stigmatising approaches.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Person-first language",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 155,
    question: "How does Complex PTSD (as defined by ICD-11) differ from BPD/EUPD in terms of self-concept, and why is this distinction clinically important?",
    options: [
      "There is no difference — they are the same condition with different names",
      "In Complex PTSD, the negative self-concept is typically linked to specific traumatic experiences, whereas in BPD/EUPD, identity disturbance is more pervasive and fluctuating; the distinction matters because treatment approaches differ",
      "Complex PTSD always involves grandiose self-image, while BPD/EUPD always involves low self-esteem",
      "The distinction does not matter because both conditions are treated identically",
    ] as const,
    correctAnswer: 1,
    explanation:
      "In Complex PTSD, the negative self-concept (e.g. feeling worthless or broken) is typically understood in relation to specific traumatic events. In BPD/EUPD, identity disturbance tends to be more pervasive, fluctuating, and not necessarily tied to identifiable traumas. This distinction is clinically important because it informs treatment: Complex PTSD benefits from trauma-focused approaches (such as trauma-focused CBT or EMDR), while BPD/EUPD may respond better to therapies like Dialectical Behaviour Therapy (DBT) or Mentalisation-Based Therapy (MBT).",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Complex PTSD (ICD-11)",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 156,
    question: "A young apprentice on site has been using cannabis heavily for several months. He begins telling colleagues that the site cameras are recording him specifically and that his supervisor is part of a surveillance operation. What is the most likely explanation and what action should be taken?",
    options: [
      "He is joking; no action is needed",
      "He may be experiencing drug-induced psychosis triggered by heavy cannabis use; he should be supported calmly, kept safe, and guided towards urgent professional help",
      "He is making a formal complaint about workplace surveillance; refer to HR",
      "He has discovered a real surveillance operation; escalate to site security",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Heavy cannabis use is a well-established risk factor for drug-induced psychosis. The paranoid beliefs about cameras and surveillance are consistent with paranoid delusions. The correct response is to remain calm, not argue with his beliefs, ensure his safety, and guide him towards urgent professional support, such as A&E or his GP. Cannabis-induced psychosis can resolve once the substance is cleared, but some individuals go on to develop longer-term psychotic conditions.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Drug-induced psychosis",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 157,
    question: "Research into Adverse Childhood Experiences (ACEs) has identified a dose-response relationship between ACE scores and health outcomes. What does this mean in practice?",
    options: [
      "Having one ACE guarantees a mental health diagnosis in adulthood",
      "The higher the number of ACEs a person has experienced, the greater their statistical risk of physical and mental health problems in adulthood, including substance misuse, depression, and heart disease",
      "ACE scores only predict physical health outcomes, not mental health",
      "ACE scores below 4 have no impact whatsoever on long-term health",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The ACE study demonstrated a dose-response relationship: the more categories of adverse childhood experience a person has, the greater their statistical risk of a wide range of negative health outcomes in adulthood, including depression, substance misuse, suicide attempts, heart disease, and cancer. Importantly, a high ACE score indicates increased risk, not certainty — resilience factors and support can mitigate the effects.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Adverse Childhood Experiences (ACEs)",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 158,
    question: "What is EMDR and how does it work as a treatment for PTSD?",
    options: [
      "Emergency Mental Distress Response — a crisis helpline for people in acute distress",
      "Eye Movement Desensitisation and Reprocessing — a therapy in which the person recalls traumatic memories while engaging in bilateral stimulation (typically guided eye movements), helping the brain reprocess the memory so it becomes less distressing",
      "Emotional Memory Deletion and Replacement — a technique that permanently erases traumatic memories",
      "Extended Medication and Drug Rehabilitation — a programme combining psychiatric medication with substance misuse treatment",
    ] as const,
    correctAnswer: 1,
    explanation:
      "EMDR stands for Eye Movement Desensitisation and Reprocessing. It is a NICE-recommended treatment for PTSD in which the person recalls traumatic memories while simultaneously engaging in bilateral stimulation, most commonly guided side-to-side eye movements. This process helps the brain reprocess traumatic memories so they become less vivid, less emotionally charged, and are stored as 'past' events rather than being relived in the present.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Trauma-focused CBT, EMDR",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 159,
    question: "A construction worker develops PTSD after a scaffolding collapse. His therapist recommends trauma-focused CBT. Which of the following best describes what this involves?",
    options: [
      "General relaxation exercises and positive thinking, with no direct discussion of the traumatic event",
      "Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions",
      "Prescribing antidepressant medication as the sole treatment",
      "Group therapy where all participants share their stories without professional facilitation",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Trauma-focused CBT is a structured psychological therapy, typically delivered over 8 to 12 sessions, that involves: psychoeducation about PTSD, carefully and gradually processing the traumatic memory (through imaginal exposure or narrative work), identifying and challenging unhelpful trauma-related beliefs (such as 'it was my fault'), and building coping strategies. NICE recommends it as a first-line treatment for PTSD.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Trauma-focused CBT, EMDR",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },
  {
    id: 160,
    question: "Why is it important to adopt a trauma-informed approach when working with someone who has BPD/EUPD, and what does this look like in practice on a construction site?",
    options: [
      "It is not important — BPD/EUPD is a personality flaw, not a trauma response",
      "A trauma-informed approach avoids re-traumatisation; in practice this means creating predictable routines, providing clear communication, responding with empathy rather than punishment to emotional outbursts, and asking 'what happened to you?' rather than 'what's wrong with you?'",
      "A trauma-informed approach means never giving the person any negative feedback",
      "A trauma-informed approach means diagnosing the person yourself and sharing the diagnosis with the team",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Many people with BPD/EUPD have experienced significant trauma, particularly adverse childhood experiences. A trauma-informed approach recognises this and aims to avoid re-traumatisation. On a construction site, this means: creating predictable routines and clear expectations, communicating calmly and consistently, responding to emotional dysregulation with empathy rather than punishment, and framing understanding around 'what happened to you?' rather than 'what's wrong with you?' This approach reduces distress, builds trust, and supports better mental health outcomes.",
    section: "Psychosis, Eating Disorders & Complex Needs",
    difficulty: "advanced" as const,
    topic: "Trauma-informed approach",
    category: "Psychosis, Eating Disorders & Complex Needs" as const,
  },

  // =======================================================================
  // WORKPLACE IMPLEMENTATION & WELLBEING — 40 questions (id 161–200)
  // =======================================================================

  // ===== BASIC (16 questions, id 161-176) =====
  {
    id: 161,
    question: "What is the recommended starting ratio of Mental Health First Aiders (MHFAs) to employees in a workplace?",
    options: [
      "1 MHFA per 10 employees",
      "1 MHFA per 50 employees",
      "1 MHFA per 100 employees",
      "1 MHFA per 25 employees",
    ] as const,
    correctAnswer: 0,
    explanation:
      "The recommended starting point is 1 trained MHFA per 10 employees. This ratio ensures adequate coverage and accessibility, though the exact number may vary depending on workplace size, shift patterns, and geographical spread.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "How many MHFAs needed",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 162,
    question: "According to research cited in the business case for workplace mental health, what is the approximate return on investment for every pound spent on mental health interventions?",
    options: [
      "£2 for every £1 spent",
      "£3 for every £1 spent",
      "£5 for every £1 spent",
      "£10 for every £1 spent",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Research, including that from Deloitte, indicates an average return of approximately £5 for every £1 invested in workplace mental health interventions. This makes a compelling business case for organisations to invest in mental health support.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Creating an MHFA programme, business case",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 163,
    question: "What is the telephone number for the Lighthouse Club construction industry charity helpline?",
    options: [
      "0800 58 58 58",
      "0345 605 1956",
      "116 123",
      "0800 068 4141",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Lighthouse Club operates a free 24/7 helpline on 0345 605 1956, providing emotional, physical, and financial wellbeing support specifically for construction workers and their families.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Construction-specific (Mates in Mind, Lighthouse Club)",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 164,
    question: "Which of the following is NOT one of the Five Ways to Wellbeing?",
    options: [
      "Connect",
      "Be Active",
      "Compete",
      "Keep Learning",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The Five Ways to Wellbeing, developed by the New Economics Foundation, are: Connect, Be Active, Take Notice, Keep Learning, and Give. 'Compete' is not one of them. These evidence-based actions promote positive mental health and wellbeing.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Five Ways to Wellbeing",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 165,
    question: "What is the main difference between an MHFA and a Mental Health Champion?",
    options: [
      "Champions receive more training than MHFAs",
      "MHFAs are trained to provide initial support and signpost; Champions raise awareness and reduce stigma but are not trained to provide first aid",
      "There is no difference between the two roles",
      "Champions can prescribe medication whereas MHFAs cannot",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Mental Health First Aiders complete a full training course and are trained to recognise signs of mental ill health, provide initial support, and signpost to appropriate help. Mental Health Champions typically receive lighter training focused on raising awareness, promoting wellbeing, and reducing stigma, but are not trained to deliver mental health first aid.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "MHFAs vs Mental Health Champions",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 166,
    question: "What does EAP stand for in the context of workplace mental health support?",
    options: [
      "Employee Assistance Programme",
      "Emergency Action Plan",
      "Employee Appraisal Process",
      "Equal Access Policy",
    ] as const,
    correctAnswer: 0,
    explanation:
      "EAP stands for Employee Assistance Programme. EAPs are typically free, confidential, and available 24/7. They offer counselling, information, and support services to employees and often their immediate family members.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "EAPs",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 167,
    question: "What telephone number should you dial in the UK if someone is in immediate danger due to a mental health crisis?",
    options: [
      "111",
      "999",
      "116 123",
      "0800 068 4141",
    ] as const,
    correctAnswer: 1,
    explanation:
      "If someone is in immediate danger to themselves or others, you should call 999 for the emergency services. This is the same number used for any life-threatening emergency in the UK.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Crisis services",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 168,
    question: "Which NHS service allows people to self-refer for talking therapy without needing a GP referral?",
    options: [
      "NHS Direct",
      "NHS Talking Therapies (formerly IAPT)",
      "NHS Crisis Team",
      "NHS Walk-in Centre",
    ] as const,
    correctAnswer: 1,
    explanation:
      "NHS Talking Therapies (formerly known as IAPT - Improving Access to Psychological Therapies) allows adults in England to self-refer for evidence-based talking therapies for common mental health conditions like depression and anxiety, without needing a GP referral.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "NHS Talking Therapies, self-referral",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 169,
    question: "Which voluntary sector organisation provides a 24/7 listening service on the number 116 123?",
    options: [
      "Mind",
      "CALM",
      "Samaritans",
      "Anxiety UK",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Samaritans provides a free, confidential 24/7 listening service available on 116 123. They offer emotional support to anyone in distress or struggling to cope, not just those who are suicidal.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Voluntary sector",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 170,
    question: "What is presenteeism in the context of workplace mental health?",
    options: [
      "Being absent from work due to mental ill health",
      "Being present at work but functioning at reduced capacity due to ill health",
      "Presenting mental health training to colleagues",
      "Being overly present and available at work",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Presenteeism refers to employees being physically present at work but functioning at reduced capacity due to ill health, including mental ill health. Research suggests presenteeism costs UK employers significantly more than absenteeism, as it is harder to identify and address.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Presenteeism vs absenteeism",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 171,
    question: "Under which piece of UK legislation must employers make reasonable adjustments for employees with a disability, including long-term mental health conditions?",
    options: [
      "Health and Safety at Work Act 1974",
      "Employment Rights Act 1996",
      "Equality Act 2010",
      "Mental Health Act 1983",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The Equality Act 2010 requires employers to make reasonable adjustments for employees with a disability. Mental health conditions that have a substantial, long-term adverse effect on a person's ability to carry out normal day-to-day activities can qualify as a disability under this Act.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Reasonable adjustments under Equality Act 2010",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 172,
    question: "What is a toolbox talk in the context of workplace mental health?",
    options: [
      "A formal disciplinary meeting about mental health issues",
      "A short, informal safety or awareness talk delivered on site, often at the start of a shift",
      "A therapy session run by a qualified counsellor on site",
      "A meeting to discuss the tools and equipment needed for mental health first aid",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A toolbox talk is a short, informal group discussion on a specific topic, typically delivered at the start of a shift or work period. Using toolbox talks to address mental health helps normalise conversations, raise awareness, and reduce stigma in workplace settings, particularly in industries like construction.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Toolbox talks on mental health",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 173,
    question: "Which of the following best describes compassion fatigue?",
    options: [
      "Feeling tired after a long day at work",
      "A gradual lessening of compassion over time, resulting from the emotional demands of helping others who are suffering",
      "Not caring about colleagues' problems",
      "Being bored of attending mental health training",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Compassion fatigue is a condition characterised by a gradual lessening of compassion over time. It is common among those who work directly with people in distress, including MHFAs, and results from the cumulative emotional toll of empathising with others' suffering.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Compassion fatigue definition and symptoms",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 174,
    question: "Which organisation specifically focuses on mental health in the construction industry?",
    options: [
      "Mind",
      "Mates in Mind",
      "CALM",
      "Rethink Mental Illness",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Mates in Mind is a charity that specifically focuses on improving and promoting positive mental health in the construction and related industries. It provides tools, resources, and training to help organisations address mental health at work.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Construction-specific (Mates in Mind, Lighthouse Club)",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 175,
    question: "What does SHOUT provide as a mental health support service?",
    options: [
      "Face-to-face counselling sessions",
      "A free 24/7 crisis text service — text SHOUT to 85258",
      "Group therapy sessions in the community",
      "Workplace mental health audits",
    ] as const,
    correctAnswer: 1,
    explanation:
      "SHOUT is a free, confidential, 24/7 text-based support service for anyone in crisis. People can text SHOUT to 85258 to be connected with a trained volunteer who can provide immediate support via text message.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Voluntary sector",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 176,
    question: "Why is it important for MHFAs to be visible and accessible in the workplace?",
    options: [
      "So that management can monitor their activities",
      "So employees know who they can approach for support and how to reach them",
      "So that MHFAs can be held accountable for any incidents",
      "So that MHFAs receive public recognition for their role",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Visibility and accessibility are essential for an effective MHFA programme. Employees need to know who the MHFAs are, where to find them, and how to approach them. This can be achieved through notice boards, intranet pages, lanyards, or posters displayed in communal areas.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "basic" as const,
    topic: "Visibility and accessibility of MHFAs",
    category: "Workplace Implementation & Wellbeing" as const,
  },

  // ===== INTERMEDIATE (16 questions, id 177-192) =====
  {
    id: 177,
    question: "The Stevenson/Farmer review 'Thriving at Work' (2017) proposed six core standards for workplace mental health. Which of the following is one of those core standards?",
    options: [
      "Provide free gym memberships for all employees",
      "Produce, implement, and communicate a mental health at work plan",
      "Appoint a full-time psychologist in every workplace",
      "Ensure all managers have a counselling qualification",
    ] as const,
    correctAnswer: 1,
    explanation:
      "One of the six core standards from the Stevenson/Farmer 'Thriving at Work' review (2017) is to produce, implement, and communicate a mental health at work plan. The six core standards are: (1) produce a mental health at work plan, (2) develop mental health awareness among employees, (3) encourage open conversations, (4) provide good working conditions, (5) promote effective people management, and (6) routinely monitor employee mental health and wellbeing.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Thriving at Work 6 core standards",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 178,
    question: "When building a business case for an MHFA programme, which of the following would be the most compelling data to present to senior leadership?",
    options: [
      "The number of employees who enjoy team social events",
      "Current sickness absence rates, presenteeism costs, and staff turnover data alongside the £5 ROI for every £1 invested",
      "A list of competitors who do not have MHFA programmes",
      "Individual employees' mental health diagnoses",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A strong business case should include relevant organisational data such as sickness absence rates, presenteeism costs, staff turnover, and EAP usage, alongside evidence of the financial return (approximately £5 for every £1 spent). Individual diagnosis data would breach confidentiality and must never be shared.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Creating an MHFA programme, business case",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 179,
    question: "What is the PHQ-9 used to assess?",
    options: [
      "Generalised anxiety disorder severity",
      "Depression severity over the past two weeks",
      "Post-traumatic stress disorder symptoms",
      "Alcohol dependency levels",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The PHQ-9 (Patient Health Questionnaire-9) is a validated screening tool used to assess the severity of depression over the past two weeks. It consists of 9 questions scored 0-3, giving a total score of 0-27. It is widely used by GPs and NHS Talking Therapies services.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "GP pathway, PHQ-9, GAD-7",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 180,
    question: "What does the GAD-7 questionnaire measure?",
    options: [
      "General physical health",
      "Severity of generalised anxiety disorder symptoms",
      "Depression severity",
      "Obsessive-compulsive disorder symptoms",
    ] as const,
    correctAnswer: 1,
    explanation:
      "The GAD-7 (Generalised Anxiety Disorder-7) is a validated screening tool used to assess the severity of generalised anxiety disorder. It consists of 7 questions scored 0-3, giving a total score of 0-21. Scores of 5, 10, and 15 represent cut-off points for mild, moderate, and severe anxiety respectively.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "GP pathway, PHQ-9, GAD-7",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 181,
    question: "Which of the following is an example of a reasonable adjustment an employer might make for an employee with a long-term mental health condition?",
    options: [
      "Dismissing the employee to reduce team stress",
      "Allowing flexible working hours or phased return to work after absence",
      "Telling all colleagues about the employee's condition so they can help",
      "Removing the employee from all team activities",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Reasonable adjustments under the Equality Act 2010 might include flexible working hours, phased return to work, changes to workload, provision of a quiet workspace, or additional support during busy periods. Adjustments should be agreed with the individual and keep their information confidential.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Reasonable adjustments under Equality Act 2010",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 182,
    question: "How can an MHFA programme be integrated with existing health and safety arrangements in the workplace?",
    options: [
      "By replacing all physical first aiders with MHFAs",
      "By including mental health in risk assessments, H&S policies, induction processes, and incident reporting",
      "By removing physical health from the H&S policy to focus solely on mental health",
      "By appointing the H&S officer as the sole MHFA",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Integrating mental health with existing health and safety systems means including mental health risks in workplace risk assessments, updating H&S policies to cover psychological wellbeing, incorporating mental health awareness into inductions, and ensuring reporting systems capture mental health-related incidents alongside physical ones.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Integrating mental health with existing H&S",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 183,
    question: "Which of the following KPIs would be most useful for measuring the impact of an MHFA programme?",
    options: [
      "Number of car parking spaces available",
      "Sickness absence rates, EAP utilisation, staff survey results, and number of MHFA interactions",
      "Total revenue and profit margins",
      "Number of social media followers the company has",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Relevant KPIs for measuring MHFA programme impact include: sickness absence rates (particularly for mental health-related absence), EAP utilisation rates, staff survey results on wellbeing and psychological safety, number of MHFA interactions, staff turnover rates, and presenteeism measures.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Measuring impact (KPIs, sickness absence, EAP usage, surveys)",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 184,
    question: "What is vicarious trauma and how might it affect an MHFA?",
    options: [
      "Physical injury sustained while helping someone in crisis",
      "The emotional residue of exposure to others' traumatic stories, which can lead to changes in the MHFA's own worldview, beliefs, and psychological functioning",
      "Feeling embarrassed about not being able to help someone",
      "Being traumatised by attending the MHFA training course",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Vicarious trauma (also called secondary traumatic stress) occurs when someone is repeatedly exposed to others' accounts of traumatic experiences. For MHFAs, hearing distressing stories can cumulatively affect their own psychological wellbeing, potentially altering their worldview, sense of safety, and emotional functioning. This is why supervision and self-care are essential.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Vicarious trauma",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 185,
    question: "Why is supervision important for MHFAs in the workplace?",
    options: [
      "To check that MHFAs are diagnosing conditions correctly",
      "To provide a confidential space for MHFAs to reflect on their experiences, process emotions, and receive guidance",
      "To ensure MHFAs are meeting their monthly targets",
      "To gather evidence for disciplinary proceedings",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Supervision provides MHFAs with a safe, confidential space to reflect on their interactions, process difficult emotions, identify signs of compassion fatigue or vicarious trauma, and receive guidance on complex situations. Regular supervision supports the MHFA's own wellbeing and helps maintain the quality of support they provide.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Supervision and debriefing",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 186,
    question: "Which of the following is an appropriate boundary for an MHFA to maintain?",
    options: [
      "Giving out their personal mobile number for 24/7 availability",
      "Keeping interactions within agreed hours and signposting to crisis services outside those times",
      "Taking on a counselling role if the person cannot afford private therapy",
      "Promising to keep secrets even if there is a risk to life",
    ] as const,
    correctAnswer: 1,
    explanation:
      "MHFAs should maintain clear boundaries, including keeping interactions within agreed hours, not acting as ongoing counsellors, and signposting to appropriate services for out-of-hours support. Giving personal numbers, taking on a counselling role, or promising absolute confidentiality when there is risk to life would all be inappropriate and potentially harmful.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Setting boundaries as an MHFA",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 187,
    question: "What is the connection between physical and mental health that employers should consider?",
    options: [
      "There is no connection; they should be managed entirely separately",
      "Physical health conditions can increase the risk of poor mental health, and poor mental health can lead to physical health problems — a holistic approach is needed",
      "Mental health only affects the brain, not the body",
      "Physical health programmes automatically improve mental health without any additional measures",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Physical and mental health are closely interconnected. People with long-term physical conditions are two to three times more likely to experience mental ill health, and those with severe mental illness die on average 15-20 years earlier due to physical health conditions. Employers should adopt a holistic approach that addresses both physical and mental wellbeing together.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Physical-mental health connection",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 188,
    question: "What should be included in a workplace mental health policy?",
    options: [
      "Only the names of employees currently receiving treatment for mental health conditions",
      "A commitment to supporting mental health, roles and responsibilities, confidentiality procedures, support available, and how adjustments will be made",
      "A statement that mental health is a private matter and not the employer's concern",
      "A list of employees who have taken sick leave for mental health reasons",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A comprehensive mental health policy should include: the organisation's commitment to supporting mental health; roles and responsibilities; confidentiality and data protection procedures; details of support available (MHFAs, EAP, occupational health); how reasonable adjustments will be managed; how the policy links to other policies; and how it will be reviewed and updated.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Mental health policy development",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 189,
    question: "Which voluntary sector organisation specifically supports men's mental health and operates the helpline 0800 58 58 58?",
    options: [
      "Samaritans",
      "Mind",
      "CALM (Campaign Against Living Miserably)",
      "Papyrus",
    ] as const,
    correctAnswer: 2,
    explanation:
      "CALM (Campaign Against Living Miserably) is a charity dedicated to preventing male suicide. Their helpline (0800 58 58 58) is available from 5pm to midnight every day. They also offer a webchat service. Male suicide remains a significant concern in the UK, with men accounting for approximately three-quarters of all suicides.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Voluntary sector",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 190,
    question: "How can an MHFA promote openness and reduce stigma around mental health in the workplace?",
    options: [
      "By publicly identifying colleagues who have mental health conditions",
      "By leading by example with open conversations, supporting campaigns like Time to Talk Day, and normalising mental health discussions through toolbox talks and awareness events",
      "By avoiding any mention of mental health to prevent making people uncomfortable",
      "By only discussing mental health during formal meetings",
    ] as const,
    correctAnswer: 1,
    explanation:
      "MHFAs can help reduce stigma by modelling openness, participating in and promoting awareness campaigns (such as Time to Talk Day and Mental Health Awareness Week), delivering toolbox talks, sharing wellbeing resources, and encouraging a culture where talking about mental health is normalised and supported.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Promoting openness and reducing stigma",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 191,
    question: "What is the purpose of NHS 111, option 2?",
    options: [
      "To book a routine GP appointment",
      "To access urgent mental health crisis support when it is not a life-threatening emergency",
      "To order repeat prescriptions",
      "To register with a new GP surgery",
    ] as const,
    correctAnswer: 1,
    explanation:
      "NHS 111, option 2 provides access to urgent mental health crisis support. It is available 24/7 across England and connects callers to trained mental health professionals who can provide immediate advice and support. It is appropriate when someone needs urgent help but the situation is not immediately life-threatening (which would require 999).",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Crisis services",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 192,
    question: "Which of the Five Ways to Wellbeing involves paying more attention to the present moment, including your thoughts, feelings, and the world around you?",
    options: [
      "Connect",
      "Give",
      "Take Notice",
      "Keep Learning",
    ] as const,
    correctAnswer: 2,
    explanation:
      "Take Notice is the element of the Five Ways to Wellbeing that involves being more aware of the present moment, including your thoughts, feelings, body, and the world around you. It is closely aligned with mindfulness principles and can help people savour positive experiences and better understand their emotional responses.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "intermediate" as const,
    topic: "Five Ways to Wellbeing",
    category: "Workplace Implementation & Wellbeing" as const,
  },

  // ===== ADVANCED (8 questions, id 193-200) =====
  {
    id: 193,
    question: "An MHFA notices they have become emotionally numb, are dreading interactions with colleagues seeking support, and have started avoiding people at work. Which of the following best describes what they may be experiencing, and what should they do?",
    options: [
      "They are showing signs of compassion fatigue and should push through it to support their colleagues",
      "They are experiencing normal stress and should take a holiday",
      "They may be experiencing compassion fatigue or vicarious trauma and should access supervision, review their boundaries, and consider temporarily stepping back from the role",
      "They should resign from their job immediately",
    ] as const,
    correctAnswer: 2,
    explanation:
      "These are classic signs of compassion fatigue or vicarious trauma — emotional numbing, dread, and avoidance. The appropriate response is to seek supervision, review and reinforce boundaries, engage in self-care, and consider temporarily stepping back from the MHFA role. Pushing through without support can worsen the condition and reduce the quality of support provided to others.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Compassion fatigue definition and symptoms",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 194,
    question: "A large construction company with 500 employees across multiple sites wants to implement an MHFA programme. Considering the recommended ratio, shift patterns, and site coverage, which approach would be most effective?",
    options: [
      "Training 5 MHFAs who work at the head office during standard hours",
      "Training 50 MHFAs distributed across all sites, covering all shift patterns, with a mix of roles and seniority levels, supported by Mental Health Champions on each site",
      "Training 2 senior managers as MHFAs and instructing all employees to contact them",
      "Relying solely on the EAP and not training any MHFAs",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Using the 1:10 starting ratio, approximately 50 MHFAs would be needed for 500 employees. They should be distributed across all sites and shift patterns to ensure accessibility. A mix of roles and seniority helps ensure employees feel comfortable approaching someone. Supplementing with Mental Health Champions on each site further extends reach. Head office-only or manager-only provision would leave significant gaps in coverage.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "How many MHFAs needed",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 195,
    question: "When implementing the Stevenson/Farmer 'Thriving at Work' enhanced standards, which of the following represents a comprehensive approach to measuring and reporting on mental health outcomes?",
    options: [
      "Counting the number of mental health posters displayed in the workplace",
      "Tracking only sickness absence days related to mental health",
      "Regularly reporting to the board on mental health KPIs including sickness absence, EAP utilisation, staff survey wellbeing scores, MHFA interaction data, and benchmarking against sector norms",
      "Asking employees once a year if they are happy at work",
    ] as const,
    correctAnswer: 2,
    explanation:
      "The enhanced standards of the Thriving at Work review recommend transparency and accountability through regular board-level reporting. This should include multiple data sources: sickness absence (especially mental health-related), EAP utilisation, staff survey results on wellbeing and psychological safety, MHFA programme data, staff turnover, and benchmarking against sector standards to demonstrate progress and identify areas for improvement.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Thriving at Work 6 core standards",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 196,
    question: "An employee discloses to an MHFA that they are having suicidal thoughts but begs the MHFA not to tell anyone. They say they have already called Samaritans and have a GP appointment next week. What is the most appropriate course of action?",
    options: [
      "Promise to keep the information completely confidential as the person has asked",
      "Immediately inform the person's line manager without their consent",
      "Acknowledge the person's wish for confidentiality, explore the immediacy of risk, explain the limits of confidentiality where there is risk to life, and collaboratively agree next steps including whether crisis services are needed before the GP appointment",
      "Tell the person to call 999 immediately and walk away",
    ] as const,
    correctAnswer: 2,
    explanation:
      "MHFAs cannot promise absolute confidentiality when there is risk to life. The appropriate approach is to acknowledge the person's request, assess the immediacy of risk (including whether they have a plan, means, and timeframe), explain the limits of confidentiality, and work collaboratively to agree on safety measures. While it is positive they have contacted Samaritans and have a GP appointment, the MHFA needs to determine if the person is safe in the interim and whether more immediate support (such as crisis services) is needed.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Setting boundaries as an MHFA",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 197,
    question: "A company's annual wellbeing survey shows that presenteeism accounts for significantly more lost productivity than absenteeism. Which combination of interventions would most effectively address this?",
    options: [
      "Implementing stricter attendance monitoring and reducing sick pay",
      "Training managers to recognise signs of presenteeism, promoting flexible working, reviewing workload management, enhancing EAP promotion, and creating a culture where taking time off for mental health is supported",
      "Encouraging employees to take sick leave instead of coming to work unwell",
      "Removing all targets and deadlines to reduce workplace stress",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Addressing presenteeism requires a multi-faceted approach: training managers to recognise and sensitively address signs of presenteeism; promoting flexible working arrangements; reviewing workloads; actively promoting EAP services; and fostering a culture where mental health is openly discussed and taking time off when unwell is supported rather than stigmatised. Stricter monitoring would likely worsen the problem by increasing fear of taking necessary time off.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Presenteeism vs absenteeism",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 198,
    question: "An MHFA has been supporting a colleague through a difficult period for several weeks. The colleague has become increasingly reliant on the MHFA, contacting them daily and resisting referral to professional services. What reflective practice should the MHFA apply?",
    options: [
      "Continue supporting the colleague indefinitely as stopping would be uncaring",
      "Abruptly stop all contact and tell the colleague they cannot help anymore",
      "Reflect on the interaction in supervision, recognise the dependency dynamic, gently but firmly re-establish boundaries, reiterate the role limits of an MHFA, and collaboratively create a plan to transition the colleague to appropriate professional support",
      "Ask a different MHFA to take over without explaining why",
    ] as const,
    correctAnswer: 2,
    explanation:
      "This scenario illustrates the importance of reflective practice and boundaries. Through supervision, the MHFA should recognise that a dependency dynamic has developed, which is outside the scope of the MHFA role. The appropriate response is to compassionately but clearly re-establish boundaries, explain that the MHFA role is for initial support and signposting rather than ongoing counselling, and work with the colleague to create a concrete plan for transitioning to professional services such as NHS Talking Therapies, a counsellor through the EAP, or their GP.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Personal resilience and reflective practice",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 199,
    question: "Papyrus is a UK charity that specifically focuses on which area of mental health?",
    options: [
      "Eating disorders in adults",
      "Prevention of young suicide (under 35) and provides the HOPELINEUK service",
      "Workplace mental health in the NHS",
      "Supporting veterans with PTSD",
    ] as const,
    correctAnswer: 1,
    explanation:
      "Papyrus is a UK charity dedicated to the prevention of young suicide. They support young people under 35 who are experiencing thoughts of suicide, as well as anyone concerned about a young person. Their HOPELINEUK service (0800 068 4141) is staffed by trained advisors who provide practical support and advice.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Voluntary sector",
    category: "Workplace Implementation & Wellbeing" as const,
  },
  {
    id: 200,
    question: "An organisation wants to embed the Five Ways to Wellbeing into its MHFA programme and wider workplace culture. Which implementation strategy best demonstrates a comprehensive approach?",
    options: [
      "Sending a single email to all staff listing the Five Ways to Wellbeing",
      "Creating a wellbeing programme that includes: team-building activities (Connect), active travel schemes and lunchtime walks (Be Active), mindfulness sessions and reflective practice groups (Take Notice), CPD opportunities and skills-sharing workshops (Keep Learning), and volunteering days and peer support schemes (Give)",
      "Putting up a poster in the break room listing the Five Ways to Wellbeing",
      "Including the Five Ways to Wellbeing in the staff handbook without any supporting activities",
    ] as const,
    correctAnswer: 1,
    explanation:
      "A comprehensive approach to embedding the Five Ways to Wellbeing requires translating each element into tangible workplace initiatives: Connect through team-building and social activities; Be Active through physical activity schemes and active travel; Take Notice through mindfulness and reflective practice; Keep Learning through CPD, mentoring, and skills-sharing; and Give through volunteering, peer support, and community engagement. Simply communicating the framework without action will not achieve meaningful impact on workplace wellbeing.",
    section: "Workplace Implementation & Wellbeing",
    difficulty: "advanced" as const,
    topic: "Five Ways to Wellbeing",
    category: "Workplace Implementation & Wellbeing" as const,
  },
];
