/**
 * Resilience & Stress Management Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced by difficulty.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const rsmCategories = [
  'Understanding Stress',
  'Understanding Resilience',
  'Coping Strategies & Mindfulness',
  'Building Daily Resilience',
  'Switching Off & Sustaining Wellbeing',
];

export const rsmMockExamConfig: MockExamConfig = {
  examId: 'resilience-stress-management',
  examTitle: 'Resilience & Stress Management Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/resilience-stress-management',
  categories: rsmCategories,
};

export const rsmQuestionBank: StandardMockQuestion[] = [
  // ─── CATEGORY 1: Understanding Stress (1-40) ───
  {
    id: 1,
    question:
      'Hans Selye (1956) identified three stages in the General Adaptation Syndrome. What is the correct order?',
    options: [
      'Resistance, Alarm, Exhaustion',
      'Alarm, Resistance, Exhaustion',
      'Exhaustion, Alarm, Resistance',
      'Alarm, Exhaustion, Resistance',
    ],
    correctAnswer: 1,
    explanation:
      "Selye described the body's response to prolonged stress as progressing through Alarm (initial shock), Resistance (the body attempts to cope), and finally Exhaustion (resources are depleted). This sequence is fundamental to understanding chronic stress.",
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 2,
    question: 'What happens to the body during the Alarm stage of the General Adaptation Syndrome?',
    options: [
      'The body adapts and begins to cope with the stressor effectively',
      'The body releases cortisol and adrenaline, triggering the fight-or-flight response',
      'The immune system strengthens to prepare for future stressors',
      'The body enters a state of deep relaxation to conserve energy',
    ],
    correctAnswer: 1,
    explanation:
      'During the Alarm stage, the body perceives a threat and activates the sympathetic nervous system, releasing stress hormones such as cortisol and adrenaline. This triggers the fight-or-flight response, preparing the body for immediate action.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 3,
    question: 'Which term describes positive, motivating stress that enhances performance?',
    options: ['Distress', 'Eustress', 'Chronic stress', 'Acute stress disorder'],
    correctAnswer: 1,
    explanation:
      'Eustress is the term coined by Selye for positive stress that motivates and focuses energy. It is associated with manageable challenges that feel exciting rather than threatening, such as starting a new project or learning a new skill.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 4,
    question:
      'In the Lazarus and Folkman (1984) Transactional Model, what does primary appraisal involve?',
    options: [
      'Evaluating what coping resources are available to deal with the stressor',
      'Assessing whether the situation is irrelevant, benign-positive, or stressful',
      'Deciding whether to use problem-focused or emotion-focused coping',
      'Measuring the physiological impact of the stressor on the body',
    ],
    correctAnswer: 1,
    explanation:
      'In primary appraisal, the individual evaluates the significance of the event: is it irrelevant, benign-positive, or stressful (involving harm, threat, or challenge)? This initial judgement determines whether a stress response is triggered at all.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 5,
    question: 'What does secondary appraisal involve in the Transactional Model of stress?',
    options: [
      'Re-evaluating whether the stressor was as bad as first thought',
      'Evaluating what coping resources and options are available',
      'Seeking a second opinion from a colleague about the situation',
      'Measuring the physical symptoms caused by the stressor',
    ],
    correctAnswer: 1,
    explanation:
      'Secondary appraisal is the process of evaluating what can be done about the stressor. The individual considers their coping resources, options, and whether they believe they can manage the situation. If resources feel insufficient, the stress response intensifies.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 6,
    question:
      'The Yerkes-Dodson Law (1908) describes the relationship between arousal and performance as which shape?',
    options: [
      'A straight upward line — more arousal always means better performance',
      'An inverted-U curve — performance peaks at moderate arousal then declines',
      'A flat line — arousal has no measurable effect on performance',
      'A downward slope — any arousal reduces performance',
    ],
    correctAnswer: 1,
    explanation:
      'The Yerkes-Dodson Law shows an inverted-U relationship: performance improves with increasing arousal up to an optimal point, then declines as arousal becomes excessive. This explains why some pressure helps but too much is harmful.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 7,
    question:
      'Which of the following is NOT one of the six HSE Management Standards areas for work-related stress?',
    options: ['Demands', 'Salary', 'Support', 'Relationships'],
    correctAnswer: 1,
    explanation:
      'The six HSE Management Standards areas are Demands, Control, Support, Relationships, Role, and Change. Salary is not included. These standards help employers identify and manage the primary sources of work-related stress.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 8,
    question:
      'Under the Health and Safety at Work Act 1974 Section 2, employers have a general duty to ensure, so far as is reasonably practicable, the:',
    options: [
      'Profitability of the business at all times',
      'Health, safety, and welfare at work of all employees',
      'Happiness and job satisfaction of every worker',
      'Physical fitness of all employees through mandatory exercise',
    ],
    correctAnswer: 1,
    explanation:
      'HSWA 1974 Section 2 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This includes mental health and managing work-related stress.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 9,
    question: 'Which physical symptom is commonly associated with chronic stress?',
    options: [
      'Improved immune function',
      'Persistent headaches and muscle tension',
      'Increased appetite with healthy food choices',
      'Deeper, more restful sleep',
    ],
    correctAnswer: 1,
    explanation:
      'Chronic stress commonly manifests as persistent headaches, muscle tension, digestive problems, and fatigue. Prolonged cortisol elevation suppresses immune function and disrupts sleep, rather than improving these areas.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 10,
    question:
      'A colleague on site who was previously outgoing has become withdrawn, irritable, and is making uncharacteristic mistakes. This most likely indicates:',
    options: [
      'They are deliberately trying to get out of work',
      'They may be experiencing significant stress and should be approached with concern',
      'They need stricter supervision and more frequent checks',
      'They are probably just tired and will recover after the weekend',
    ],
    correctAnswer: 1,
    explanation:
      'Behavioural changes such as withdrawal, irritability, and increased errors are classic signs of stress. Approaching the person with genuine concern, rather than judgement, is the appropriate first response and can open the door to support.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 11,
    question:
      'Which hormone is primarily responsible for the sustained stress response when a threat persists?',
    options: ['Insulin', 'Cortisol', 'Melatonin', 'Serotonin'],
    correctAnswer: 1,
    explanation:
      'Cortisol is released by the adrenal glands during sustained stress. While adrenaline triggers the immediate fight-or-flight response, cortisol maintains the body in a state of heightened alertness over longer periods, which can be damaging if prolonged.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 12,
    question: 'The fight-flight-freeze response is controlled by which part of the nervous system?',
    options: [
      'The parasympathetic nervous system',
      'The sympathetic nervous system',
      'The central nervous system only',
      'The enteric nervous system',
    ],
    correctAnswer: 1,
    explanation:
      'The sympathetic nervous system activates the fight-flight-freeze response, preparing the body for action by increasing heart rate, dilating pupils, and redirecting blood to muscles. The parasympathetic system does the opposite, promoting rest and recovery.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 13,
    question:
      'Which behavioural symptom of stress is particularly dangerous on a construction site?',
    options: [
      'Eating lunch alone occasionally',
      'Increased risk-taking and poor concentration leading to safety errors',
      'Preferring to work with the same colleague each day',
      'Listening to music during break times',
    ],
    correctAnswer: 1,
    explanation:
      'Increased risk-taking and poor concentration are behavioural symptoms of stress that become particularly dangerous on construction sites where safety-critical decisions are made constantly. Stress-related inattention is a contributing factor in many site accidents.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 14,
    question: 'What is distress?',
    options: [
      'Any form of physical pain caused by manual handling',
      'Negative stress that overwhelms coping ability and impairs functioning',
      'A legal term for financial loss caused by an employer',
      'The medical name for depression',
    ],
    correctAnswer: 1,
    explanation:
      "Distress is negative stress that exceeds a person's ability to cope, leading to anxiety, reduced performance, and potential health problems. Unlike eustress, distress feels unmanageable and threatening rather than challenging and motivating.",
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 15,
    question:
      'According to the Yerkes-Dodson Law, what happens to performance on a complex task when arousal is very high?',
    options: [
      'Performance reaches its absolute peak',
      'Performance deteriorates significantly',
      'Performance remains stable regardless of arousal',
      'Performance improves but only for physical tasks',
    ],
    correctAnswer: 1,
    explanation:
      'The Yerkes-Dodson Law shows that complex tasks require lower levels of arousal for optimal performance. Very high arousal causes anxiety and cognitive overload, significantly impairing performance on tasks requiring concentration, judgement, and problem-solving.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 16,
    question:
      'Under the Management of Health and Safety at Work Regulations 1999, Regulation 3 requires employers to:',
    options: [
      'Provide free counselling to all employees',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Guarantee that no employee will ever experience stress at work',
      'Appoint a full-time mental health officer on every site',
    ],
    correctAnswer: 1,
    explanation:
      'MHSWR 1999 Regulation 3 requires a suitable and sufficient risk assessment covering all risks to health and safety, which includes work-related stress. Employers must identify hazards and implement proportionate control measures.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 17,
    question: 'The HSE Management Standard for "Control" relates to:',
    options: [
      'How much say a person has in the way they do their work',
      'How well managers control the behaviour of their teams',
      'The level of CCTV and monitoring on a construction site',
      'The ability of HR to control absence rates',
    ],
    correctAnswer: 0,
    explanation:
      'The HSE Control standard concerns the degree of autonomy workers have over how they carry out their tasks. Low control combined with high demands is a well-established recipe for work-related stress, as described in the Demand-Control model.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 18,
    question: 'Which UK major occupation group has the highest rate of suicide?',
    options: [
      'Healthcare workers',
      'Construction workers',
      'Financial services workers',
      'Agricultural workers',
    ],
    correctAnswer: 1,
    explanation:
      'Construction workers have the highest rate of suicide of any major occupation group in the UK. ONS data consistently shows construction workers are at significantly elevated risk, making mental health awareness in the industry critically important.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 19,
    question: 'In the context of stress, what does "cognitive symptoms" refer to?',
    options: [
      'Physical pain in the head and neck region',
      'Difficulty concentrating, racing thoughts, poor memory, and indecisiveness',
      'Changes in eating and sleeping patterns',
      'Increased use of alcohol or other substances',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive symptoms of stress affect thinking and mental processing: difficulty concentrating, racing or intrusive thoughts, poor memory, and indecisiveness. These are distinct from physical, emotional, and behavioural symptoms, though all often occur together.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 20,
    question:
      'A site electrician tells you he has been having trouble sleeping, is snapping at his family, and feels his chest tighten every Sunday evening before the work week. These symptoms suggest:',
    options: [
      'A physical heart condition requiring immediate medical attention',
      'Work-related stress manifesting across physical, emotional, and behavioural domains',
      'Normal reactions that everyone experiences and nothing to worry about',
      'He simply needs more annual leave',
    ],
    correctAnswer: 1,
    explanation:
      'Sleep disruption (physical), irritability with family (behavioural), and anticipatory chest tightness (physical/emotional) together indicate work-related stress affecting multiple domains. This pattern warrants a supportive conversation and potential signposting to help.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 21,
    question: 'The Exhaustion stage of the General Adaptation Syndrome is characterised by:',
    options: [
      'The body successfully adapting and returning to normal',
      "Depletion of the body's resources, leading to burnout, illness, or breakdown",
      'A sudden burst of energy as the body makes a final attempt to cope',
      'The stressor being removed and recovery beginning immediately',
    ],
    correctAnswer: 1,
    explanation:
      "In the Exhaustion stage, the body's adaptive resources are depleted after prolonged resistance. This can lead to burnout, physical illness, mental health problems, and systemic breakdown. It underscores why chronic, unmanaged stress is so damaging.",
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 22,
    question: 'The HSE Management Standard for "Role" addresses:',
    options: [
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'The specific trade qualifications required for each job on site',
      'Whether employees are given acting or temporary roles during absences',
      'The role of the health and safety executive in enforcing regulations',
    ],
    correctAnswer: 0,
    explanation:
      'The Role standard concerns whether workers understand their role clearly and whether conflicting demands within or between roles are avoided. Role ambiguity and role conflict are significant sources of workplace stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 23,
    question: 'Which of the following best describes the "freeze" response in fight-flight-freeze?',
    options: [
      'Calmly assessing the situation before responding rationally',
      'A state of temporary immobility or dissociation when the threat feels inescapable',
      'Choosing to ignore the stressor and carry on as normal',
      'Falling asleep due to extreme fatigue from the stressor',
    ],
    correctAnswer: 1,
    explanation:
      'The freeze response occurs when the brain perceives a threat as inescapable. The person may feel paralysed, unable to think clearly, or experience dissociation. This is an involuntary survival mechanism, not a conscious choice to do nothing.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 24,
    question:
      'An electrician working alone on a remote site with no phone signal, unclear instructions, and a demanding client is experiencing stress related to which HSE Management Standards areas?',
    options: [
      'Demands, Control, and Support',
      'Role, Change, and Relationships',
      'Support, Relationships, and Change',
      'Demands and Role only',
    ],
    correctAnswer: 0,
    explanation:
      'This scenario involves high Demands (demanding client), low Control (unclear instructions, limited autonomy), and low Support (working alone, no phone signal). Recognising which HSE standards are engaged helps target the right interventions.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 25,
    question: 'Adrenaline differs from cortisol in that adrenaline:',
    options: [
      'Is only released during positive stress experiences',
      'Acts rapidly for the immediate fight-or-flight response, whereas cortisol sustains the longer-term stress response',
      'Is produced in the brain, whereas cortisol is produced in the liver',
      'Has no physical effects on the body',
    ],
    correctAnswer: 1,
    explanation:
      'Adrenaline (epinephrine) acts within seconds, increasing heart rate and blood pressure for immediate action. Cortisol acts over minutes to hours, maintaining elevated blood sugar and suppressing non-essential functions during prolonged stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 26,
    question: 'The HSE Management Standard for "Change" refers to:',
    options: [
      'How often employees are required to change their work clothes',
      'How organisational change, large or small, is managed and communicated',
      'The legal requirement to change risk assessments every 12 months',
      'Moving workers between sites without notice',
    ],
    correctAnswer: 1,
    explanation:
      'The Change standard addresses how organisational change is managed and communicated. Poor communication about change, lack of consultation, and uncertainty about the future are significant stressors. Workers need to feel informed and involved.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 27,
    question: 'Which emotional symptom of stress is most likely to damage workplace relationships?',
    options: [
      'Feeling occasionally tired at the end of a shift',
      'Persistent irritability, mood swings, and disproportionate anger',
      'Feeling proud after completing a difficult task',
      'Mild nervousness before a performance review',
    ],
    correctAnswer: 1,
    explanation:
      'Persistent irritability, mood swings, and disproportionate anger are emotional symptoms of stress that directly damage relationships with colleagues, supervisors, and family members. These reactions often feel uncontrollable to the stressed person.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 28,
    question:
      'When recognising signs of stress in a colleague, the most appropriate first action is to:',
    options: [
      'Report them to the site manager immediately',
      'Have a private, non-judgemental conversation expressing genuine concern',
      'Tell them to take a few days off sick',
      'Avoid them to give them space',
    ],
    correctAnswer: 1,
    explanation:
      'A private, non-judgemental conversation is the best first step. Simply asking "Are you alright?" in a genuine way can open the door. Reporting to management or avoiding the person may increase their isolation and stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 29,
    question: 'The Resistance stage of the General Adaptation Syndrome involves:',
    options: [
      'The body giving up and shutting down all non-essential functions',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      'An immediate panic reaction to the initial threat',
      'Complete recovery and return to the pre-stress baseline',
    ],
    correctAnswer: 1,
    explanation:
      'During the Resistance stage, the body attempts to adapt to the continuing stressor. While outward functioning may appear normal, the body is using significant physiological resources to maintain this adaptation, which cannot be sustained indefinitely.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 30,
    question: 'The Transactional Model of stress emphasises that stress is determined by:',
    options: [
      'The severity of the external event alone',
      "The individual's perception of the event and their perceived ability to cope",
      'Genetics and nothing else',
      'The number of hours worked per week',
    ],
    correctAnswer: 1,
    explanation:
      "Lazarus and Folkman's Transactional Model emphasises that stress is not inherent in events themselves but arises from the interaction between the person's appraisal of the event and their perceived coping resources. The same event can be stressful for one person and not another.",
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 31,
    question:
      'According to the Yerkes-Dodson Law, a simple, well-practised task (such as basic cable stripping) is best performed at:',
    options: [
      'Very low arousal to maintain calm',
      'A relatively high level of arousal, as the task requires less cognitive effort',
      'No arousal at all — complete relaxation',
      'The same arousal level as a complex design task',
    ],
    correctAnswer: 1,
    explanation:
      'The Yerkes-Dodson Law states that simple tasks benefit from higher arousal levels, as the task demands less cognitive processing. Complex tasks, however, require moderate to low arousal for optimal performance, as high arousal impairs concentration.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 32,
    question:
      'A contractor argues that stress is a personal problem, not a workplace issue. Under UK law, this position is:',
    options: [
      "Correct — stress is a personal health matter outside the employer's control",
      'Incorrect — employers have a legal duty under HSWA 1974 and MHSWR 1999 to assess and manage work-related stress risks',
      'Correct — only physical hazards are covered by health and safety law',
      'A matter of opinion with no clear legal position',
    ],
    correctAnswer: 1,
    explanation:
      'UK law is clear: HSWA 1974 Section 2 covers health (including mental health) and MHSWR 1999 Regulation 3 requires risk assessment of all risks including stress. Courts have upheld successful stress-related personal injury claims against employers.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 33,
    question: 'The concept of "allostatic load" in stress physiology refers to:',
    options: [
      'The maximum weight a stressed worker can safely lift',
      'The cumulative wear and tear on the body from chronic activation of stress response systems',
      'The number of stressors a person can handle simultaneously',
      'The financial cost of stress-related absence to a business',
    ],
    correctAnswer: 1,
    explanation:
      'Allostatic load describes the cumulative physiological toll of repeated or chronic stress. When stress response systems are activated too frequently or for too long, the body accumulates damage to cardiovascular, immune, metabolic, and neural systems.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 34,
    question:
      'An employer conducts a stress risk assessment and identifies that their electricians face high demands, low control, and poor support. According to the Demand-Control-Support model, this combination predicts:',
    options: [
      'High motivation and job satisfaction',
      'The highest risk of work-related stress and associated illness',
      'Average stress levels that require no intervention',
      'Low stress because high demands keep workers engaged',
    ],
    correctAnswer: 1,
    explanation:
      "Karasek's Demand-Control model (extended with Support by Johnson & Hall) identifies high demands combined with low control and low support as the highest-risk configuration for work-related stress and associated cardiovascular and mental health problems.",
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 35,
    question:
      'Which of the following best explains why construction has a particularly high suicide rate compared to other industries?',
    options: [
      'Construction workers are inherently less resilient than other workers',
      'A combination of factors including job insecurity, peripatetic working, macho culture inhibiting help-seeking, financial pressures of self-employment, and access to means',
      'Construction workers are more likely to have pre-existing mental health conditions',
      'The physical nature of the work causes brain damage that leads to depression',
    ],
    correctAnswer: 1,
    explanation:
      'The elevated construction suicide rate is driven by multiple interacting factors: precarious employment, time away from home, a culture that discourages vulnerability, financial stress from self-employment and CIS tax, and access to means. No single factor is responsible.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 36,
    question:
      'If a stressed worker presents with chest pain and shortness of breath, the priority action is to:',
    options: [
      'Assume it is a panic attack and help them breathe slowly',
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Tell them to sit down and have a glass of water',
      'Send them home to rest and see their GP tomorrow',
    ],
    correctAnswer: 1,
    explanation:
      'Chest pain and shortness of breath must always be treated as a potential medical emergency. Panic attacks and cardiac events can present identically, and chronic stress is itself a risk factor for heart disease. Only medical professionals can safely differentiate.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  {
    id: 37,
    question: 'The HSE Management Standard for "Relationships" includes addressing:',
    options: [
      'Personal romantic relationships between colleagues',
      'Unacceptable behaviour such as bullying, harassment, and conflict at work',
      'The relationship between the company and its shareholders',
      'Client-contractor commercial relationships',
    ],
    correctAnswer: 1,
    explanation:
      'The Relationships standard focuses on promoting positive working relationships and addressing unacceptable behaviour including bullying and harassment. Toxic workplace relationships are a significant and well-documented source of stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 38,
    question: 'The "Demands" area of the HSE Management Standards covers:',
    options: [
      'Workload, work patterns, and the work environment',
      'Financial demands placed on employees such as tool purchases',
      'Customer demands and complaints handling',
      'The demand for qualified electricians in the labour market',
    ],
    correctAnswer: 0,
    explanation:
      'The Demands standard addresses issues such as workload, work patterns (including shift work), and the physical work environment. The standard requires that demands are achievable within agreed hours and that workers are matched to the demands of the job.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 39,
    question:
      'Which of the following is an emotional symptom of stress rather than a cognitive one?',
    options: [
      'Difficulty making decisions',
      'Persistent feelings of dread and overwhelming anxiety',
      'Racing thoughts that are hard to control',
      'Forgetting important information',
    ],
    correctAnswer: 1,
    explanation:
      'Persistent dread and anxiety are emotional symptoms. Difficulty making decisions, racing thoughts, and forgetfulness are cognitive symptoms. The distinction matters because different intervention strategies target different symptom domains.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 40,
    question:
      'In the context of stress risk assessment, a "hazard" versus a "risk" is best described as:',
    options: [
      'They mean the same thing and can be used interchangeably',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'A hazard is a physical danger; a risk is a psychological one',
      'A risk is always more serious than a hazard',
    ],
    correctAnswer: 1,
    explanation:
      'In risk assessment, a hazard is anything with the potential to cause harm (e.g., excessive workload), while risk is the likelihood that the harm will occur and the severity of that harm. This distinction is fundamental to proportionate stress risk management.',
    category: 'Understanding Stress',
    difficulty: 'advanced' as const,
  },
  // ─── CATEGORY 2: Understanding Resilience (41-80) ───
  {
    id: 41,
    question: 'The American Psychological Association (APA) defines resilience as:',
    options: [
      "The absence of stress or adversity in a person's life",
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
      'A personality trait that some people are born with and others are not',
      'The ability to avoid all negative emotions',
    ],
    correctAnswer: 1,
    explanation:
      'The APA defines resilience as the process of adapting well in the face of adversity. Crucially, it is a process, not a fixed trait — meaning it involves behaviours, thoughts, and actions that can be learned and developed by anyone.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 42,
    question:
      'Connor and Davidson (2003) developed the CD-RISC to measure resilience. Their key finding was that resilience is:',
    options: [
      'Fixed at birth and cannot be changed',
      'Learnable and modifiable, varying over time and context',
      'Only present in people who have never experienced trauma',
      'Determined entirely by intelligence',
    ],
    correctAnswer: 1,
    explanation:
      "Connor and Davidson's research demonstrated that resilience is not a fixed trait but a dynamic quality that can be learned, developed, and strengthened. The CD-RISC scale is widely used to measure resilience and track changes over time.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 43,
    question:
      'Carol Dweck (2006) described two types of mindset. A "growth mindset" is the belief that:',
    options: [
      'Intelligence and abilities are fixed from birth',
      'Abilities and intelligence can be developed through effort, learning, and persistence',
      'Only physical skills can be improved, not mental ones',
      'Growth only happens during childhood and adolescence',
    ],
    correctAnswer: 1,
    explanation:
      "Dweck's growth mindset holds that abilities are developed through dedication and hard work. This contrasts with a fixed mindset, which sees talent as innate. A growth mindset is strongly linked to resilience because setbacks are viewed as opportunities to learn.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 44,
    question:
      'The concept of neuroplasticity is important to resilience because it demonstrates that:',
    options: [
      'The brain stops developing after age 25',
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      "Only children's brains can adapt to new challenges",
      'Brain structure is entirely determined by genetics',
    ],
    correctAnswer: 1,
    explanation:
      "Neuroplasticity — the brain's ability to reorganise and form new neural connections throughout life — provides the biological basis for building resilience. Repeated practice of resilient thinking and behaviour physically reshapes brain circuits.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 45,
    question: 'The "resilience bucket" metaphor describes:',
    options: [
      'A bucket of water used for stress relief exercises',
      'The idea that everyone has a finite capacity for stress, and resilience involves both reducing the flow in (stressors) and increasing the flow out (coping strategies)',
      'A physical container used in team-building exercises',
      'A method of collecting anonymous stress reports on site',
    ],
    correctAnswer: 1,
    explanation:
      'The resilience bucket metaphor helps visualise stress management: stressors fill the bucket, coping strategies drain it. If more goes in than comes out, the bucket overflows (breakdown). Building resilience means both reducing inflow and increasing outflow.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 46,
    question: 'A protective factor for resilience is:',
    options: [
      'Something that increases vulnerability to stress',
      'A condition or attribute that reduces the impact of risk and supports positive adaptation',
      'Personal protective equipment such as hard hats and boots',
      'A type of insurance policy against work-related illness',
    ],
    correctAnswer: 1,
    explanation:
      'Protective factors are conditions, attributes, or resources that buffer against the negative effects of stress and adversity. Examples include strong social connections, problem-solving skills, sense of purpose, and emotional regulation ability.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 47,
    question: 'Which of the following is a risk factor that reduces resilience?',
    options: [
      'Strong family relationships',
      'Social isolation, lack of support networks, and poor coping habits',
      'Regular physical exercise',
      'A clear sense of purpose in work',
    ],
    correctAnswer: 1,
    explanation:
      "Risk factors such as social isolation, weak support networks, and unhealthy coping habits (e.g., excessive alcohol use) undermine resilience. They reduce a person's capacity to adapt and recover from adversity.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 48,
    question: 'Seligman\'s concept of "Learned Optimism" proposes that:',
    options: [
      'Some people are born optimistic and others cannot learn it',
      'Optimistic thinking patterns can be deliberately learned by challenging pessimistic explanatory styles',
      'Optimism is always better than realism in every situation',
      'Pessimistic people are more intelligent than optimistic people',
    ],
    correctAnswer: 1,
    explanation:
      'Seligman demonstrated that optimism is not just an innate trait but a learnable skill. By identifying and challenging pessimistic explanatory styles — how we explain bad events to ourselves — people can develop more resilient, optimistic thinking patterns.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 49,
    question: 'A stress diary is useful for building resilience because it helps a person to:',
    options: [
      'Prove to their employer that they are stressed',
      'Identify patterns, triggers, and the effectiveness of their coping strategies over time',
      'Record their working hours for payroll purposes',
      'Diagnose themselves with a clinical anxiety disorder',
    ],
    correctAnswer: 1,
    explanation:
      'A stress diary helps individuals track stressors, their responses, and what coping strategies worked. Over time, patterns emerge — specific triggers, times of day, or situations — enabling targeted, evidence-based resilience building.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 50,
    question:
      'A person with a fixed mindset is most likely to respond to a failed electrical inspection by saying:',
    options: [
      '"I need to review the report, understand what went wrong, and learn from it"',
      '"I\'m just not good enough — some people are natural electricians and I\'m not one of them"',
      '"This is a useful challenge that will make me better at my job"',
      '"Let me ask my mentor for feedback so I can improve next time"',
    ],
    correctAnswer: 1,
    explanation:
      'A fixed mindset interprets failure as evidence of permanent, unchangeable inadequacy. The statement "I\'m just not good enough" reflects the belief that ability is innate. A growth mindset would see the failure as a learning opportunity.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 51,
    question: 'Self-assessment of resilience is valuable because it:',
    options: [
      'Replaces the need for professional mental health support',
      'Helps individuals identify their strengths and areas for development, creating a personal baseline',
      'Provides a clinical diagnosis of resilience levels',
      'Is required by law before starting work on a construction site',
    ],
    correctAnswer: 1,
    explanation:
      'Self-assessment tools like the CD-RISC help individuals understand their current resilience profile — what they are already good at and what needs strengthening. This baseline enables targeted development and tracking of progress over time.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 52,
    question:
      'Which of the following best describes the relationship between resilience and adversity?',
    options: [
      'Resilient people never experience adversity',
      'Resilience is developed through experiencing and successfully navigating adversity, not by avoiding it',
      'Adversity always destroys resilience',
      'Resilience makes adversity feel pleasant',
    ],
    correctAnswer: 1,
    explanation:
      'Resilience is built through the experience of facing challenges and developing effective responses. Like a muscle, it strengthens with use. People who have never faced adversity may actually be less resilient when they eventually encounter it.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 53,
    question:
      "Seligman's PERMA model identifies five elements of wellbeing. What does PERMA stand for?",
    options: [
      'Positivity, Energy, Relationships, Motivation, Achievement',
      'Positive Emotion, Engagement, Relationships, Meaning, Accomplishment',
      'Persistence, Empathy, Resilience, Mindfulness, Awareness',
      'Purpose, Enjoyment, Rest, Management, Adaptability',
    ],
    correctAnswer: 1,
    explanation:
      'PERMA represents Positive Emotion, Engagement, Relationships, Meaning, and Accomplishment. Seligman proposed these five pillars as the foundation of human flourishing and wellbeing, each of which can be deliberately cultivated.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 54,
    question:
      'Tedeschi and Calhoun (2004) identified Post-Traumatic Growth. This concept describes:',
    options: [
      'The immediate positive feeling after surviving a traumatic event',
      'Positive psychological change experienced as a result of the struggle with highly challenging life circumstances',
      'A medical treatment for post-traumatic stress disorder',
      'The physical growth of new brain cells after trauma',
    ],
    correctAnswer: 1,
    explanation:
      'Post-Traumatic Growth describes the phenomenon where individuals experience positive psychological transformation through their struggle with adversity. It does not deny suffering but recognises that profound personal growth can emerge alongside it.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 55,
    question:
      'Which of the following is one of the five domains of Post-Traumatic Growth identified by Tedeschi and Calhoun?',
    options: [
      'Increased financial wealth',
      'Greater appreciation of life',
      'Reduced need for social contact',
      'Permanent elimination of negative emotions',
    ],
    correctAnswer: 1,
    explanation:
      'The five domains of PTG are: greater appreciation of life, new possibilities, improved relationships, increased personal strength, and spiritual/existential change. Greater appreciation of life — valuing each day more — is one of the most commonly reported.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 56,
    question: 'Seligman\'s "3 Ps" that can hinder recovery from setbacks are:',
    options: [
      'Planning, Preparation, and Performance',
      'Personalisation, Pervasiveness, and Permanence',
      'Pessimism, Procrastination, and Perfectionism',
      'Patience, Persistence, and Positivity',
    ],
    correctAnswer: 1,
    explanation:
      "The 3 Ps are thinking traps: Personalisation (it's all my fault), Pervasiveness (this ruins everything), and Permanence (this will last forever). Recognising and challenging these patterns is key to resilient thinking after setbacks.",
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 57,
    question: '"Personalisation" in the context of the 3 Ps means:',
    options: [
      'Customising your workspace to reflect your personality',
      'Blaming yourself entirely for a negative event, even when external factors contributed',
      'Making a situation personal by involving others unnecessarily',
      'Adding personal touches to your work to show craftsmanship',
    ],
    correctAnswer: 1,
    explanation:
      'Personalisation is the tendency to assume complete personal responsibility for negative events while ignoring external factors. For example, blaming yourself entirely for a project delay when supply chain issues were the primary cause.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 58,
    question:
      'Reivich and Shatte (2002) identified seven abilities of highly resilient people. Which of the following is one of these abilities?',
    options: [
      'The ability to avoid all stressful situations',
      'Emotional regulation — the ability to manage strong feelings under pressure',
      'The ability to work without any breaks',
      'The ability to suppress all negative thoughts permanently',
    ],
    correctAnswer: 1,
    explanation:
      "Reivich and Shatte's seven resilience abilities include emotional regulation, impulse control, causal analysis, self-efficacy, realistic optimism, empathy, and reaching out. Emotional regulation — managing feelings without being overwhelmed — is foundational.",
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 59,
    question: 'The "Pervasiveness" trap in the 3 Ps involves:',
    options: [
      'A stressor being present in every workplace',
      'Believing that a setback in one area of life will undermine all other areas',
      'A disease that spreads through a population',
      'The widespread nature of stress in the construction industry',
    ],
    correctAnswer: 1,
    explanation:
      'Pervasiveness is the thinking trap of allowing one setback to contaminate all areas of life. For example, a difficult day on site leads to thinking "nothing ever goes right for me" rather than containing the problem to its specific context.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 60,
    question: 'The "Permanence" trap in the 3 Ps involves believing that:',
    options: [
      'Good things will last forever',
      'The negative effects of a setback will last forever and the situation will never improve',
      'Permanent employment is better than contract work',
      'Change is always permanent and irreversible',
    ],
    correctAnswer: 1,
    explanation:
      'Permanence is the thinking trap of believing that current difficulties will never end. "I\'ll always feel this way" or "Things will never get better" are characteristic permanence thoughts that undermine resilience and motivation to act.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 61,
    question: 'Which element of the PERMA model focuses on being fully absorbed in an activity?',
    options: ['Positive Emotion', 'Engagement', 'Meaning', 'Accomplishment'],
    correctAnswer: 1,
    explanation:
      'Engagement refers to being fully absorbed in activities — what Csikszentmihalyi called "flow." When engaged, time passes quickly and attention is fully focused. This state is associated with high wellbeing and is a key pillar of Seligman\'s model.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 62,
    question: 'Identifying personal stress triggers is an important resilience skill because:',
    options: [
      'It allows you to avoid all stressful situations permanently',
      'It enables you to anticipate, prepare for, and manage your responses to known stressors',
      'It provides evidence for a compensation claim',
      'It means you will never feel stressed again',
    ],
    correctAnswer: 1,
    explanation:
      'Knowing your triggers enables proactive management rather than reactive crisis. If you know that tight deadlines trigger your stress response, you can plan ahead, break tasks down, and deploy coping strategies before the stress escalates.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 63,
    question:
      'According to Dweck, a growth mindset response to receiving critical feedback on your work would be:',
    options: [
      'Ignoring the feedback because you know best',
      '"This feedback shows me specifically where I can improve — what can I learn from this?"',
      'Feeling personally attacked and becoming defensive',
      'Immediately agreeing with everything to avoid conflict',
    ],
    correctAnswer: 1,
    explanation:
      'A growth mindset welcomes constructive feedback as valuable information for development. Rather than taking it personally (fixed mindset), the individual focuses on what can be learned and how to improve, viewing the feedback as a gift.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 64,
    question:
      "Which of Reivich and Shatte's seven resilience abilities involves accurately identifying the causes of problems?",
    options: ['Impulse control', 'Causal analysis', 'Reaching out', 'Self-efficacy'],
    correctAnswer: 1,
    explanation:
      'Causal analysis is the ability to accurately identify the causes of problems rather than jumping to conclusions or catastrophising. It involves considering multiple factors and avoiding the thinking traps of personalisation and overgeneralisation.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 65,
    question:
      'An apprentice electrician fails their first AM2 assessment. Which response demonstrates the highest resilience?',
    options: [
      'Deciding that electrical work is not for them and quitting',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Blaming the assessor for being unfair and refusing to accept the result',
      'Pretending it did not happen and hoping to pass next time without changes',
    ],
    correctAnswer: 1,
    explanation:
      'The most resilient response combines acceptance of the setback, analytical thinking (what went wrong), proactive planning (targeted revision), and action (rebooking). This demonstrates growth mindset, causal analysis, and self-efficacy in action.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 66,
    question: 'Resilience differs from simple "toughness" because resilience:',
    options: [
      'Means never showing any emotion or vulnerability',
      'Involves adaptive flexibility, emotional awareness, and willingness to seek support, not just enduring hardship',
      'Is about physical strength and stamina',
      'Requires suppressing all negative feelings',
    ],
    correctAnswer: 1,
    explanation:
      'True resilience is not about being tough or stoic. It involves emotional intelligence, flexibility, willingness to ask for help, and the ability to adapt strategies when circumstances change. The "just get on with it" mentality can actually undermine resilience.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 67,
    question:
      'Post-Traumatic Growth is different from resilience in that PTG specifically involves:',
    options: [
      'Returning to the same level of functioning as before the trauma',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
      'Avoiding all reminders of the traumatic event',
      'Receiving professional therapy for a minimum of 12 months',
    ],
    correctAnswer: 1,
    explanation:
      'While resilience involves bouncing back to a previous level of functioning, PTG describes growth beyond the pre-trauma baseline. People may develop deeper relationships, greater appreciation of life, new possibilities, or increased personal strength.',
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 68,
    question:
      'Seligman\'s concept of "learned helplessness" is relevant to resilience because it shows that:',
    options: [
      'Helplessness is a permanent condition that cannot be reversed',
      'When people repeatedly experience uncontrollable negative events, they can learn to believe they are powerless, but this belief can be unlearned',
      'Asking for help is a sign of weakness',
      'Only laboratory animals experience learned helplessness',
    ],
    correctAnswer: 1,
    explanation:
      "Seligman's original research showed that repeated exposure to uncontrollable events creates learned helplessness — a belief that nothing you do matters. Crucially, his later work on Learned Optimism demonstrated this pattern can be reversed through cognitive techniques.",
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 69,
    question:
      "The CD-RISC (Connor-Davidson Resilience Scale) measures resilience across factors including personal competence, trust in one's instincts, and:",
    options: [
      'Annual income and job title',
      'Positive acceptance of change and secure relationships',
      'Number of qualifications held',
      'Physical fitness test results',
    ],
    correctAnswer: 1,
    explanation:
      "The CD-RISC assesses resilience across five factors: personal competence and tenacity, trust in one's instincts and tolerance of negative affect, positive acceptance of change and secure relationships, control, and spiritual influences. It treats resilience as multidimensional.",
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 70,
    question:
      'A site manager who experienced a serious accident on site five years ago now mentors others on safety, reports finding deeper meaning in his work, and says the experience fundamentally changed his priorities for the better. This best illustrates:',
    options: [
      "Denial of the trauma's impact",
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
      'A sign that the trauma was not actually serious',
      'Stockholm syndrome',
    ],
    correctAnswer: 1,
    explanation:
      "This scenario illustrates Post-Traumatic Growth across several of Tedeschi and Calhoun's domains: new possibilities (mentoring), meaning (deeper purpose), and appreciation of life (changed priorities). Growth and ongoing pain from the trauma can coexist.",
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 71,
    question:
      'Which of the five PTG domains involves discovering new paths or interests that were not present before the adversity?',
    options: [
      'Personal strength',
      'New possibilities',
      'Greater appreciation of life',
      'Improved relationships',
    ],
    correctAnswer: 1,
    explanation:
      'The "new possibilities" domain of PTG describes discovering new interests, directions, or opportunities that emerged specifically because of the struggle with adversity. People often report pursuing new careers, hobbies, or life paths they would not have considered before.',
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 72,
    question: 'Self-efficacy, as it relates to resilience, is best defined as:',
    options: [
      'The ability to work without supervision',
      "A person's belief in their own ability to succeed in specific situations and accomplish tasks",
      'Efficiency in completing work quickly',
      'The ability to be self-employed',
    ],
    correctAnswer: 1,
    explanation:
      "Self-efficacy (Bandura, 1977) is the belief in one's capacity to execute behaviours necessary to achieve specific goals. It is a crucial component of resilience because people who believe they can cope are more likely to take effective action under pressure.",
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 73,
    question:
      "Which of the following is NOT one of Reivich and Shatte's seven resilience abilities?",
    options: ['Empathy', 'Financial planning', 'Realistic optimism', 'Impulse control'],
    correctAnswer: 1,
    explanation:
      'The seven abilities are: emotional regulation, impulse control, causal analysis, self-efficacy, realistic optimism, empathy, and reaching out. Financial planning, while beneficial, is not one of the seven core resilience abilities identified in their research.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 74,
    question: '"Reaching out" in Reivich and Shatte\'s resilience framework means:',
    options: [
      'Physically reaching for objects that are out of normal reach',
      'The willingness to try new experiences, take appropriate risks, and connect with others for support',
      'Contacting as many people as possible on social media',
      'Reaching production targets set by your employer',
    ],
    correctAnswer: 1,
    explanation:
      'Reaching out involves both seeking connection and support from others and being willing to try new things and take calculated risks. Resilient people know when to ask for help and are open to new experiences that promote growth.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 75,
    question:
      'The growth mindset concept is particularly relevant to electrical apprentices because:',
    options: [
      'Apprentices are younger and their brains grow faster',
      'The apprenticeship journey involves constant challenges, setbacks, and skill development that require belief in the ability to improve',
      'Growth mindset only applies to people under 25',
      'Electrical work does not require ongoing learning',
    ],
    correctAnswer: 1,
    explanation:
      'Apprentices face continual learning challenges: new skills, assessments, difficult installations, and sometimes failure. A growth mindset helps them persist through these challenges, viewing each setback as a stepping stone rather than evidence of inadequacy.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 76,
    question:
      'Which of the following statements reflects "realistic optimism" as described in resilience research?',
    options: [
      '"Everything will definitely be fine — there is nothing to worry about"',
      '"This is a genuinely difficult situation, but I believe I can find a way through it with effort and support"',
      '"I refuse to acknowledge any problems — positive thinking is all I need"',
      '"Things always work out without any effort"',
    ],
    correctAnswer: 1,
    explanation:
      'Realistic optimism combines honest acknowledgement of challenges with confidence in the ability to cope. It differs from blind optimism by accepting reality while maintaining the belief that positive action can improve the outcome.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 77,
    question:
      'In the resilience bucket metaphor, which of the following represents a "tap" that drains stress from the bucket?',
    options: [
      'Working overtime every weekend',
      'Regular exercise, social connection, and adequate sleep',
      'Checking work emails at midnight',
      'Avoiding all conversations about feelings',
    ],
    correctAnswer: 1,
    explanation:
      'In the bucket metaphor, taps represent healthy coping strategies that drain stress: exercise, social connection, sleep, hobbies, and relaxation techniques. The more effective taps you have, the less likely the bucket is to overflow.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 78,
    question: 'A key difference between a risk factor and a protective factor is that:',
    options: [
      'Risk factors are physical and protective factors are emotional',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'Risk factors only apply to young people and protective factors only apply to adults',
      'There is no meaningful difference between them',
    ],
    correctAnswer: 1,
    explanation:
      'Risk factors (such as isolation, substance misuse, financial insecurity) increase vulnerability, while protective factors (such as strong relationships, sense of purpose, good health) provide a buffer. Resilience building involves reducing risk factors and strengthening protective factors.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 79,
    question:
      'An experienced electrician with 20 years on site says, "I\'ve seen it all and dealt with it all — I don\'t need to think about resilience." This attitude is problematic because:',
    options: [
      'It shows appropriate confidence from years of experience',
      'Resilience is not a permanent state — it fluctuates with life circumstances and requires ongoing maintenance, regardless of experience',
      'Only younger workers need to think about resilience',
      'Twenty years of experience guarantees permanent resilience',
    ],
    correctAnswer: 1,
    explanation:
      'Resilience is dynamic, not permanent. Life changes (health issues, relationship breakdown, financial stress, bereavement) can deplete resilience regardless of experience. Complacency about mental fitness is as dangerous as complacency about physical safety.',
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 80,
    question:
      'Research into resilience and neuroplasticity together suggest that the most effective way to build resilience is through:',
    options: [
      'Reading a single book about resilience',
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
      'A one-off training course with no follow-up',
      'Genetic testing to identify resilience genes',
    ],
    correctAnswer: 1,
    explanation:
      'Neuroplasticity shows that repeated practice physically reshapes brain circuits. Building resilience therefore requires consistent practice — regularly using coping strategies, challenging thinking traps, and developing support networks — not one-off interventions.',
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  // ─── CATEGORY 3: Coping Strategies & Mindfulness (81-120) ───
  {
    id: 81,
    question:
      'Jon Kabat-Zinn developed Mindfulness-Based Stress Reduction (MBSR) in 1979 at which institution?',
    options: [
      'Harvard Medical School',
      'University of Massachusetts Medical Centre',
      'University of Oxford',
      'Stanford University',
    ],
    correctAnswer: 1,
    explanation:
      'Kabat-Zinn founded the MBSR programme at the University of Massachusetts Medical Centre in 1979. The programme was originally designed for patients with chronic pain and has since become the most widely researched mindfulness intervention in the world.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 82,
    question: 'Which of the following best defines mindfulness?',
    options: [
      'Clearing the mind of all thoughts completely',
      'Paying attention to the present moment, on purpose, without judgement',
      'A religious practice only suitable for monks',
      'A technique for improving memory and recall',
    ],
    correctAnswer: 1,
    explanation:
      'Kabat-Zinn defined mindfulness as "paying attention in a particular way: on purpose, in the present moment, and non-judgementally." It is not about emptying the mind but about noticing thoughts and feelings without getting caught up in them.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 83,
    question: 'Box Breathing (also called square breathing) follows which pattern?',
    options: [
      'Breathe in for 2 seconds, hold for 6 seconds, breathe out for 2 seconds',
      'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds',
      'Breathe in for 7 seconds, hold for 4 seconds, breathe out for 8 seconds',
      'Breathe rapidly for 10 seconds then hold breath for 30 seconds',
    ],
    correctAnswer: 1,
    explanation:
      'Box Breathing follows a 4-4-4-4 pattern: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. This equal-sided pattern activates the parasympathetic nervous system, reducing the stress response quickly and effectively.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 84,
    question: 'The 5-4-3-2-1 Grounding technique involves engaging which senses?',
    options: [
      'Only sight and hearing',
      'Five things you see, four you touch, three you hear, two you smell, one you taste',
      'Five deep breaths, four stretches, three positive thoughts, two sips of water, one minute of silence',
      'Only touch and smell',
    ],
    correctAnswer: 1,
    explanation:
      'The 5-4-3-2-1 technique anchors attention to the present by engaging all five senses: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. This breaks the cycle of anxious or racing thoughts by reconnecting with physical reality.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 85,
    question: 'A common misconception about mindfulness is that:',
    options: [
      'It has an evidence base supported by NICE guidelines',
      'You must completely empty your mind of all thoughts for it to work',
      'It can be practised in short sessions throughout the day',
      'It can help with stress, anxiety, and depression',
    ],
    correctAnswer: 1,
    explanation:
      'A widespread misconception is that mindfulness requires emptying the mind. In reality, thoughts will naturally arise during practice. Mindfulness is about noticing thoughts without judgement and gently returning attention to the chosen focus, such as the breath.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 86,
    question: 'Aaron Beck (1976) is the founder of which therapeutic approach?',
    options: [
      'Psychoanalysis',
      'Cognitive Behavioural Therapy (CBT)',
      'Person-Centred Therapy',
      'Eye Movement Desensitisation and Reprocessing (EMDR)',
    ],
    correctAnswer: 1,
    explanation:
      'Beck developed Cognitive Behavioural Therapy (CBT), which is based on the principle that our thoughts (cognitions), feelings, and behaviours are interconnected. By identifying and challenging unhelpful thought patterns, we can change how we feel and behave.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 87,
    question: 'In Ellis\'s ABC Model, what does "B" stand for?',
    options: ['Behaviour', 'Beliefs', 'Brain', 'Balance'],
    correctAnswer: 1,
    explanation:
      'In the ABC Model, A is the Activating event, B is the Beliefs about that event, and C is the Consequences (emotional and behavioural). Ellis demonstrated that it is our beliefs about events, not the events themselves, that determine our emotional responses.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 88,
    question: 'Problem-focused coping involves:',
    options: [
      'Avoiding the problem and hoping it resolves itself',
      'Taking practical steps to address or manage the source of the stress directly',
      'Focusing on how the problem makes you feel',
      'Blaming others for causing the problem',
    ],
    correctAnswer: 1,
    explanation:
      "Problem-focused coping (Lazarus & Folkman) involves taking direct action to address the stressor: planning, seeking information, making changes, or removing the source of stress. It is most effective when the stressor is within the person's control.",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 89,
    question: 'Emotion-focused coping is most appropriate when:',
    options: [
      'The stressor can be easily removed or changed',
      'The stressor is largely outside your control and managing your emotional response is the priority',
      'You want to avoid dealing with the problem entirely',
      'You are feeling calm and not stressed at all',
    ],
    correctAnswer: 1,
    explanation:
      'Emotion-focused coping strategies (such as acceptance, reappraisal, and seeking emotional support) are most useful when the stressor cannot be changed. For example, grieving a bereavement or coping with an industry-wide downturn requires emotional management.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 90,
    question: 'Avoidant coping refers to:',
    options: [
      'Carefully planning how to avoid a known hazard on site',
      'Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal',
      'The legitimate safety practice of avoiding dangerous areas',
      'Choosing the easiest task to do first each morning',
    ],
    correctAnswer: 1,
    explanation:
      'Avoidant coping involves strategies that provide temporary relief but do not address the stressor: excessive alcohol use, denial, withdrawal, procrastination, or distraction. While natural in the short term, persistent avoidant coping prolongs and worsens stress.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 91,
    question: 'The 3-Minute Breathing Space in mindfulness practice consists of which three steps?',
    options: [
      'Breathe in, hold, breathe out',
      'Awareness of current experience, gathering attention to the breath, expanding attention to the whole body',
      'Close your eyes, clear your mind, open your eyes',
      'Count to ten, stretch, drink water',
    ],
    correctAnswer: 1,
    explanation:
      'The 3-Minute Breathing Space has three phases: (1) awareness — acknowledging current thoughts, feelings, and sensations; (2) gathering — focusing attention narrowly on the breath; (3) expanding — widening attention to the whole body and surroundings.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 92,
    question: 'A Body Scan meditation involves:',
    options: [
      'Using a medical scanner to check for physical injuries',
      'Systematically directing attention through each part of the body, noticing sensations without trying to change them',
      'Tensing and releasing muscles in sequence',
      'Checking your body temperature with a thermometer',
    ],
    correctAnswer: 1,
    explanation:
      'A Body Scan involves slowly moving attention through the body from head to toe (or vice versa), noticing sensations like tension, warmth, or tingling without judgement. It develops body awareness and helps release physical tension associated with stress.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 93,
    question:
      'NICE (National Institute for Health and Care Excellence) recommends mindfulness-based cognitive therapy (MBCT) for:',
    options: [
      'Treating broken bones',
      'Preventing relapse in recurrent depression',
      'Curing all mental health conditions',
      'Replacing all other forms of therapy',
    ],
    correctAnswer: 1,
    explanation:
      'NICE recommends MBCT specifically for preventing relapse in people who have experienced three or more episodes of depression. This endorsement is based on robust clinical trial evidence showing MBCT significantly reduces recurrence rates.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 94,
    question: 'Cognitive reframing involves:',
    options: [
      'Replacing a picture frame in your home to improve your mood',
      'Deliberately looking at a situation from a different perspective to change your emotional response to it',
      'Rewriting a report to make it more positive',
      'Forgetting about a negative event entirely',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive reframing is a CBT technique where you deliberately reinterpret a situation from a different angle. For example, reframing a failed inspection from "I\'m a failure" to "This shows me exactly what I need to study" changes the emotional response from shame to motivation.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 95,
    question: 'In CBT, a "cognitive distortion" is:',
    options: [
      'A deliberate lie told to deceive others',
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
      'A visual illusion caused by tiredness',
      'A brain injury affecting cognition',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive distortions are systematic errors in thinking identified by Beck. They include catastrophising, black-and-white thinking, mind reading, and overgeneralisation. These distortions are automatic, feel true, and reinforce negative emotional states.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 96,
    question: 'The cognitive distortion of "catastrophising" involves:',
    options: [
      'Preparing for a natural disaster as part of emergency planning',
      'Imagining the worst possible outcome and treating it as the most likely outcome',
      'Recognising that a situation is genuinely catastrophic',
      'Making an insurance claim for catastrophic damage',
    ],
    correctAnswer: 1,
    explanation:
      'Catastrophising is jumping to the worst possible conclusion and assuming it is the most likely. For example, a small disagreement with a supervisor becomes "I\'m going to get sacked." Challenging this distortion involves assessing the realistic probability of the feared outcome.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 97,
    question: 'A thought record is a CBT tool used to:',
    options: [
      'Record everything you think about during the day in a diary',
      'Capture a specific situation, the automatic thought, the emotion, the evidence for and against the thought, and a balanced alternative',
      'Write a list of positive affirmations to repeat each morning',
      'Record minutes from team meetings',
    ],
    correctAnswer: 1,
    explanation:
      'A thought record structures the process of examining unhelpful thoughts: the situation, the automatic thought, the resulting emotion, evidence for the thought, evidence against it, and a more balanced alternative. This process weakens cognitive distortions over time.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 98,
    question:
      'An electrician thinks, "I made a mistake on that board, therefore I am completely incompetent at my job." This is an example of which cognitive distortion?',
    options: [
      'Realistic assessment',
      'Overgeneralisation — drawing a sweeping conclusion from a single event',
      'Appropriate concern about quality',
      'Healthy self-reflection',
    ],
    correctAnswer: 1,
    explanation:
      'Overgeneralisation takes a single event (one mistake) and draws a sweeping conclusion about overall competence. The balanced alternative would be: "I made a mistake on this board, but I have completed many successful installations. Let me learn from this specific error."',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 99,
    question:
      'The ABC Model demonstrates that the same activating event can produce different consequences in different people because:',
    options: [
      'Different people have different genetics that determine their reactions',
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
      'Some people simply cannot control their emotions',
      'The environment affects everyone identically',
    ],
    correctAnswer: 1,
    explanation:
      "Ellis's ABC Model shows that beliefs (B) mediate between events (A) and consequences (C). Two electricians facing the same redundancy may respond differently: one may catastrophise (leading to despair) while another may see it as an opportunity (leading to proactive job searching).",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 100,
    question:
      'When using the 5-4-3-2-1 grounding technique during a panic attack on a busy construction site, the primary benefit is:',
    options: [
      'It makes the noise on site quieter',
      'It redirects attention from internal panic to external sensory reality, interrupting the escalation of anxiety',
      'It warns other workers that you are having a panic attack',
      'It improves your physical fitness',
    ],
    correctAnswer: 1,
    explanation:
      'During panic, the mind becomes trapped in an internal loop of catastrophic thoughts. The 5-4-3-2-1 technique forces attention outward to sensory experience, breaking the anxiety cycle. This is why it works well in busy environments — there are plenty of sensory anchors.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 101,
    question: 'Box Breathing is used by military special forces because it:',
    options: [
      'Gives them superhuman strength',
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
      'Makes them invisible to the enemy',
      'Replaces the need for sleep',
    ],
    correctAnswer: 1,
    explanation:
      'Box Breathing activates the vagus nerve and parasympathetic nervous system, lowering heart rate and blood pressure within minutes. Its simplicity and effectiveness under extreme pressure make it a favoured technique among military, emergency services, and high-performance professions.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 102,
    question:
      '"Black-and-white thinking" (also called all-or-nothing thinking) is a cognitive distortion where:',
    options: [
      'A person sees only monochrome colours due to a visual condition',
      'A person views situations in extreme, absolute terms with no middle ground — everything is either perfect or a complete failure',
      'A person writes all documents in black and white rather than colour',
      'A person consistently wears black and white clothing',
    ],
    correctAnswer: 1,
    explanation:
      'Black-and-white thinking sees no middle ground: a minor error makes the whole job a disaster, a single criticism negates all positive feedback. Resilient thinking involves recognising the grey areas and maintaining a balanced, proportionate perspective.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 103,
    question:
      'When an electrician faces a stressor they can control (such as poor time management causing deadline pressure), the most effective coping style is:',
    options: [
      'Emotion-focused coping — accepting the situation as it is',
      'Problem-focused coping — taking practical steps to improve time management',
      'Avoidant coping — working longer hours without addressing the root cause',
      'Denial — pretending the deadline does not exist',
    ],
    correctAnswer: 1,
    explanation:
      'When a stressor is controllable, problem-focused coping is most effective: identify the cause (poor time management), take action (improve planning, use scheduling tools, delegate). Emotion-focused coping is better suited to stressors outside your control.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 104,
    question: 'The NHS website lists mindfulness as an evidence-based technique for:',
    options: [
      'Curing physical illnesses such as cancer',
      'Improving mental wellbeing and managing stress, anxiety, and low mood',
      'Replacing all medication for depression',
      'Treating only severe psychiatric conditions',
    ],
    correctAnswer: 1,
    explanation:
      'The NHS recognises mindfulness as an evidence-based approach to improve mental wellbeing and manage stress, anxiety, and low mood. It is recommended as a complementary practice, not as a replacement for medical treatment where needed.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 105,
    question: 'A key principle of CBT that makes it practical for construction workers is that it:',
    options: [
      'Requires lying on a couch and discussing childhood for years',
      'Focuses on identifying and changing current thought patterns and behaviours, producing results in a structured timeframe',
      "Can only be practised in a therapist's office",
      'Involves hypnosis and unconscious mind work',
    ],
    correctAnswer: 1,
    explanation:
      'CBT is practical, structured, and time-limited — typically 6-20 sessions. It focuses on current problems and actionable changes rather than lengthy exploration of the past. Self-help CBT techniques (like thought records) can also be used independently.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 106,
    question:
      'An electrician is stuck in traffic, running late for work, and thinking "My boss will go mental, I\'ll probably get a warning, this always happens to me." Applying the ABC Model, the most helpful intervention is to:',
    options: [
      'Drive faster and more dangerously to arrive on time',
      "Challenge the beliefs (B): \"I'll call ahead, being late once is not a disaster, and 'always' is an exaggeration\"",
      'Give up and go home',
      'Blame the traffic and refuse to take any responsibility',
    ],
    correctAnswer: 1,
    explanation:
      'The ABC Model targets beliefs. The catastrophising ("go mental," "warning") and overgeneralisation ("always") can be challenged with more balanced thoughts: calling ahead shows responsibility, one late arrival rarely leads to formal action, and "always" is rarely accurate.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 107,
    question: 'Research evidence for mindfulness includes findings that regular practice:',
    options: [
      'Has no measurable effect on the brain',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
      'Increases stress hormone levels',
      'Only works as a placebo effect',
    ],
    correctAnswer: 1,
    explanation:
      'Neuroscience research (including studies by Lazar et al. and Hölzel et al.) has shown that regular mindfulness practice is associated with measurable brain changes including increased grey matter in regions associated with emotional regulation, reduced cortisol, and improved immune markers.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 108,
    question: 'A limitation of emotion-focused coping that is important to recognise is:',
    options: [
      'It has no benefits at all',
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'It is illegal in the UK',
      'It always leads to avoidant coping',
    ],
    correctAnswer: 1,
    explanation:
      'While valuable when stressors are uncontrollable, relying solely on emotion-focused coping for controllable problems means the source of stress persists. Effective coping involves matching the strategy to the situation: problem-focused for controllable stressors, emotion-focused for uncontrollable ones.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 109,
    question: 'Cognitive distortion "mind reading" in a construction context might look like:',
    options: [
      'Using a multimeter to read electrical values',
      'Assuming you know what your supervisor thinks about you without any evidence — "He thinks I\'m useless"',
      'Reading the project specifications carefully',
      "Reading your colleague's facial expression accurately",
    ],
    correctAnswer: 1,
    explanation:
      'Mind reading is the cognitive distortion of assuming you know what others are thinking without evidence. On construction sites, this often manifests as assuming criticism or negative judgement: "The foreman must think I\'m slow." Challenging this requires seeking actual evidence.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 110,
    question:
      'An electrician who uses alcohol every evening to "switch off" from work stress is primarily using:',
    options: [
      'Problem-focused coping',
      'Avoidant coping, which provides temporary relief but does not address the underlying stressor and creates additional health risks',
      'Evidence-based stress management',
      'Emotion-focused coping as recommended by health professionals',
    ],
    correctAnswer: 1,
    explanation:
      'Regular alcohol use to escape stress is avoidant coping. While it provides temporary numbing, it does not resolve the stressor, disrupts sleep quality, impairs next-day performance, and can escalate into dependency — creating a new and serious problem.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 111,
    question: 'The CBT concept of "emotional reasoning" involves:',
    options: [
      'Using logic to understand your emotions',
      'Assuming that because you feel something, it must be true — "I feel incompetent, therefore I am incompetent"',
      'Reasoning with someone who is emotional',
      'Using emotional intelligence to make decisions',
    ],
    correctAnswer: 1,
    explanation:
      'Emotional reasoning is the distortion of treating feelings as facts: "I feel anxious about this installation, therefore it must be dangerous." Feelings are valid but are not evidence. CBT teaches us to check feelings against objective evidence before acting on them.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 112,
    question:
      'A practical way to introduce mindfulness into a site routine without taking extra time is:',
    options: [
      'It is impossible — mindfulness requires a quiet room and at least 30 minutes',
      'Paying full attention to a routine activity (such as a toolbox talk or tea break) instead of being on autopilot',
      'Closing your eyes while walking between areas of the site',
      'Meditating while operating power tools',
    ],
    correctAnswer: 1,
    explanation:
      'Informal mindfulness means bringing full present-moment attention to activities you are already doing. Paying attention during a toolbox talk, noticing the taste of your tea, or focusing on the physical sensations of walking between tasks all build the mindfulness skill without extra time.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 113,
    question: 'Lazarus and Folkman identified that most effective copers use:',
    options: [
      'Only problem-focused coping',
      'A flexible combination of both problem-focused and emotion-focused coping, matched to the demands of the situation',
      'Only emotion-focused coping',
      'Avoidant coping as their primary strategy',
    ],
    correctAnswer: 1,
    explanation:
      'Lazarus and Folkman found that flexible coping — using problem-focused strategies when the stressor is controllable and emotion-focused strategies when it is not — is most effective. Rigid adherence to one style regardless of context is less adaptive.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 114,
    question: 'In the ABC Model, the "C" (Consequences) includes:',
    options: [
      'Only the practical consequences of the event',
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'Only financial consequences',
      'The legal consequences of the event',
    ],
    correctAnswer: 1,
    explanation:
      "In Ellis's ABC Model, consequences encompass both emotional responses (anger, anxiety, sadness) and behavioural responses (withdrawal, aggression, avoidance). Changing beliefs (B) changes both types of consequence simultaneously.",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 115,
    question: 'Which of the following is NOT a recognised cognitive distortion in CBT?',
    options: [
      'Catastrophising',
      'Realistic assessment of risk',
      'Mind reading',
      'Emotional reasoning',
    ],
    correctAnswer: 1,
    explanation:
      'Realistic assessment of risk is healthy, rational thinking — the opposite of a cognitive distortion. Catastrophising, mind reading, and emotional reasoning are all recognised distortions that CBT aims to identify and challenge.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 116,
    question: 'The primary purpose of the "gathering" step in the 3-Minute Breathing Space is to:',
    options: [
      'Gather your belongings before leaving',
      'Narrow attention to the physical sensation of breathing, creating a focused anchor point',
      'Gather other people together for a group exercise',
      'Think about as many things as possible at once',
    ],
    correctAnswer: 1,
    explanation:
      'The gathering step narrows attention from the wide awareness of step one to the specific anchor of the breath. This focused attention calms the mind and provides a stable point from which attention can be expanded again in the final step.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 117,
    question: 'Cognitive reframing does NOT mean:',
    options: [
      'Looking at a situation from a different perspective',
      'Pretending that something negative did not happen or denying reality',
      'Finding a more balanced way to interpret events',
      'Challenging automatic negative thoughts with evidence',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive reframing is not denial or toxic positivity. It involves honestly examining a situation from multiple angles to find a more balanced and accurate interpretation, not pretending bad things did not happen.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 118,
    question: 'The "should" statement is a cognitive distortion where a person:',
    options: [
      'Plans what they should do tomorrow based on their schedule',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'Follows health and safety requirements as they should',
      'Advises a colleague on what they should do next',
    ],
    correctAnswer: 1,
    explanation:
      '"Should" statements impose rigid, absolute rules: "I should always be perfect," "He should know better." When reality fails to meet these inflexible standards, frustration, guilt, and anger result. More flexible thinking uses "I would prefer" or "It would be helpful if."',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 119,
    question:
      'Mindfulness-based practice is particularly relevant for construction workers because:',
    options: [
      'Construction workers have more free time than other professionals',
      'The high-stress, physically demanding environment benefits from quick, portable techniques that require no equipment',
      'Construction workers are more spiritual than other workers',
      'It is a mandatory requirement under CDM Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Techniques like Box Breathing and 5-4-3-2-1 grounding require no equipment, no special environment, and can be done in seconds. This makes them highly practical for site environments where formal wellbeing interventions may not be available.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 120,
    question:
      'A thought record reveals that an electrician consistently catastrophises about electrical inspections. The most effective CBT strategy would be to:',
    options: [
      'Avoid all future inspections',
      'Examine the evidence: how many inspections have they actually failed versus passed, and what is the realistic worst-case outcome?',
      'Tell them to stop thinking negatively',
      'Prescribe medication for anxiety',
    ],
    correctAnswer: 1,
    explanation:
      "CBT challenges distortions with evidence. If the electrician has passed 95% of inspections, this objective data contradicts the catastrophic belief. Examining realistic (not worst-case) outcomes further reduces the distortion's power over time.",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  // ─── CATEGORY 4: Building Daily Resilience (121-160) ───
  {
    id: 121,
    question:
      'The recommended amount of sleep for adults to support mental and physical health is:',
    options: [
      '4-5 hours per night',
      '7-9 hours per night',
      '10-12 hours per night',
      '5-6 hours per night',
    ],
    correctAnswer: 1,
    explanation:
      'Sleep research consistently recommends 7-9 hours for adults. Insufficient sleep impairs concentration, emotional regulation, immune function, and decision-making — all critical for construction work safety and overall resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 122,
    question: 'Which of the following is a core principle of good sleep hygiene?',
    options: [
      'Using your phone in bed to help you fall asleep',
      'Maintaining a consistent sleep and wake time, even on weekends',
      'Drinking alcohol before bed to relax',
      'Sleeping in as late as possible whenever you can',
    ],
    correctAnswer: 1,
    explanation:
      "Consistent sleep and wake times regulate the circadian rhythm — the body's internal clock. Irregular patterns disrupt this rhythm, making it harder to fall asleep and reducing sleep quality, even if total hours seem adequate.",
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 123,
    question: 'Dehydration on site can contribute to stress because it:',
    options: [
      'Makes you thirsty, which is merely a minor inconvenience',
      'Impairs cognitive function, concentration, and mood, and increases fatigue and irritability',
      'Only affects physical strength, not mental performance',
      'Has no measurable effect on brain function',
    ],
    correctAnswer: 1,
    explanation:
      'Even mild dehydration (1-2%) impairs concentration, short-term memory, mood, and decision-making. On construction sites, where physical work increases fluid loss, staying hydrated is essential for both safety and mental resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 124,
    question: 'Physical exercise benefits mental resilience through which mechanism?',
    options: [
      'It only builds physical strength with no mental benefits',
      'It releases endorphins, reduces cortisol, improves sleep, and builds neuroplasticity',
      'It exhausts you so that you are too tired to worry',
      'It replaces the need for social connection',
    ],
    correctAnswer: 1,
    explanation:
      'Exercise provides multiple mental health benefits: endorphin release improves mood, cortisol is reduced, sleep quality improves, and neuroplasticity is enhanced. Regular exercise is one of the most evidence-based resilience-building strategies available.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 125,
    question:
      'A common mistake is assuming that physically demanding construction work is the same as exercise. This is incorrect because:',
    options: [
      'All physical activity is identical in its health benefits',
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
      'Construction work provides better exercise than going to a gym',
      'There is no difference between work and exercise',
    ],
    correctAnswer: 1,
    explanation:
      'Physical work on site is often repetitive, involves awkward postures, and creates strain rather than balanced fitness. Voluntary exercise — chosen, varied, and enjoyable — provides cardiovascular benefits, stress relief, and mental health improvements that site work does not.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 126,
    question: 'The Mates in Mind charity focuses on:',
    options: [
      'Providing free building materials to charities',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
      'Recruiting mates (friends) for lonely construction workers',
      'Teaching construction skills to unemployed people',
    ],
    correctAnswer: 1,
    explanation:
      'Mates in Mind is a UK charity dedicated to improving mental health in the construction industry. It works with employers to raise awareness, reduce stigma, and build a culture where workers feel able to seek help for mental health difficulties.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 127,
    question: 'The Lighthouse Club provides:',
    options: [
      'Guided tours of lighthouses around the UK',
      'Financial and emotional support specifically for construction workers and their families',
      'Specialist lighthouse engineering services',
      'Navigation training for maritime workers',
    ],
    correctAnswer: 1,
    explanation:
      "The Lighthouse Club is the construction industry's charity, providing financial grants, emotional support, and a 24/7 helpline specifically for construction workers and their families. Their helpline number is 0345 605 1956.",
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 128,
    question: 'Social connection is a protective factor for resilience because:',
    options: [
      'Socialising distracts you from your problems permanently',
      'Supportive relationships provide emotional support, practical help, a sense of belonging, and buffer against the effects of stress',
      'Having more social media followers reduces stress',
      'Social connection only matters for extroverts',
    ],
    correctAnswer: 1,
    explanation:
      'Research consistently shows that strong social connections are one of the most powerful protective factors against stress and mental illness. Supportive relationships provide a sense of belonging, practical help, emotional support, and a buffer against adversity.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 129,
    question:
      'Under the Working Time Regulations 1998, the maximum average working week (unless opted out) is:',
    options: ['35 hours', '48 hours', '60 hours', '40 hours'],
    correctAnswer: 1,
    explanation:
      'The Working Time Regulations 1998 set a maximum average working week of 48 hours, calculated over a 17-week reference period. Workers can voluntarily opt out in writing, but employers cannot force them to do so.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 130,
    question:
      'The Working Time Regulations 1998 entitle workers to a minimum daily rest period of:',
    options: ['8 hours', '11 consecutive hours', '6 hours', '12 hours'],
    correctAnswer: 1,
    explanation:
      'Workers are entitled to 11 consecutive hours of rest in each 24-hour period. This is designed to ensure adequate recovery time between shifts, which is essential for safety, cognitive function, and long-term health.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 131,
    question:
      'An electrician is struggling with CIS (Construction Industry Scheme) tax deductions and feels overwhelmed by financial paperwork. The most appropriate organisation to contact for free, confidential help is:',
    options: [
      'The police',
      "Citizens Advice or HMRC's helpline for guidance on CIS and tax obligations",
      'Their electricity supplier',
      'A private solicitor charging by the hour',
    ],
    correctAnswer: 1,
    explanation:
      'Citizens Advice provides free, confidential guidance on tax and financial matters. HMRC also offers a dedicated helpline for CIS queries. Financial stress is a major issue for self-employed construction workers, and these services exist to help.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 132,
    question: 'StepChange is a UK charity that provides:',
    options: [
      'Step-by-step construction training',
      'Free, confidential debt advice and debt management solutions',
      'Physical fitness programmes with step counting',
      'Staircase design and installation services',
    ],
    correctAnswer: 1,
    explanation:
      'StepChange is a leading UK debt charity providing free, confidential advice and practical solutions for people struggling with debt. Financial stress is a significant resilience risk factor, and StepChange offers structured plans to regain control.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 133,
    question:
      'Setting boundaries at work, such as saying no to excessive overtime, supports resilience because:',
    options: [
      'It shows you are not committed to your job',
      'It protects recovery time, prevents burnout, and maintains energy for sustained performance over time',
      'It is legally required to refuse all overtime',
      'It annoys your employer, which reduces your workload',
    ],
    correctAnswer: 1,
    explanation:
      'Boundary setting is a key resilience skill. Saying no to excessive demands protects recovery time, prevents the depletion that leads to burnout, and actually sustains higher-quality performance over the long term. It is a sign of self-awareness, not lack of commitment.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 134,
    question:
      'HMRC\'s "Time to Pay" arrangement is relevant to construction worker resilience because it:',
    options: [
      'Allows workers to take time off to pay bills',
      'Enables people who cannot pay their tax bill in full to negotiate a manageable payment plan, reducing financial stress',
      "Pays construction workers' wages on time",
      'Extends the working day so workers can earn more to pay taxes',
    ],
    correctAnswer: 1,
    explanation:
      "HMRC's Time to Pay arrangements allow those struggling with tax bills to negotiate affordable monthly payments. For self-employed construction workers facing cash flow difficulties, this can significantly reduce the financial stress that undermines resilience.",
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 135,
    question: 'Energy drinks consumed on site to combat fatigue can undermine resilience because:',
    options: [
      'They contain vitamins that are harmful',
      'High caffeine and sugar cause a short-term boost followed by a crash, disrupt sleep, and can increase anxiety and heart rate',
      'They are too expensive for most workers',
      'They taste unpleasant',
    ],
    correctAnswer: 1,
    explanation:
      'Energy drinks often contain 150-300mg of caffeine and 30-50g of sugar per can. The initial boost is followed by a crash, and excessive caffeine increases anxiety, disrupts sleep, and elevates heart rate — all of which worsen stress and reduce resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 136,
    question: 'Peer support models in construction are effective because:',
    options: [
      'Peers can prescribe medication for stress',
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
      'Peers can diagnose mental health conditions',
      'It is cheaper than providing actual mental health services',
    ],
    correctAnswer: 1,
    explanation:
      'Peer support works because construction workers often relate better to someone who shares their experience. Trained peer supporters (Mental Health First Aiders, for example) bridge the gap between formal services and the informal culture on site.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 137,
    question: 'The minimum annual leave entitlement under the Working Time Regulations 1998 is:',
    options: [
      '4 weeks (20 days)',
      '5.6 weeks (28 days for a 5-day worker), which can include bank holidays',
      '6 weeks (30 days)',
      '3 weeks (15 days)',
    ],
    correctAnswer: 1,
    explanation:
      'The statutory minimum is 5.6 weeks of paid annual leave, which for a 5-day worker equals 28 days. Employers can include bank holidays within this entitlement. Taking regular leave is essential for recovery and sustained resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 138,
    question: 'Financial stress is particularly prevalent in construction because of:',
    options: [
      'Construction workers earning the highest wages in the UK',
      'Job insecurity, fluctuating income, self-employment complexity, CIS tax deductions, and periods between contracts',
      'Construction workers being required to buy their own hard hats',
      'The cost of commuting by helicopter to remote sites',
    ],
    correctAnswer: 1,
    explanation:
      'Construction has high rates of self-employment, meaning income fluctuates with contracts. CIS tax deductions, periods between jobs, tool and vehicle costs, and the complexity of self-assessment create financial stress that directly undermines mental resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 139,
    question: "Building an emergency fund of 3-6 months' expenses supports resilience because:",
    options: [
      'It makes you wealthy',
      'It reduces the catastrophic impact of unexpected events like illness, redundancy, or gaps between contracts',
      'It is required by law for self-employed workers',
      'It earns interest that replaces your income',
    ],
    correctAnswer: 1,
    explanation:
      'An emergency fund provides a financial buffer that reduces the stress of unexpected events. For construction workers, gaps between contracts are common, and knowing there is a financial cushion reduces anxiety and preserves the ability to make rational decisions.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 140,
    question:
      'Alcohol disrupts sleep quality even when it helps you fall asleep initially because:',
    options: [
      'It has no effect on sleep at all',
      'It suppresses REM (rapid eye movement) sleep, which is essential for emotional processing and memory consolidation',
      'It makes you sleep too deeply',
      'It only affects sleep if consumed in large quantities',
    ],
    correctAnswer: 1,
    explanation:
      'Alcohol may speed sleep onset but severely disrupts sleep architecture, particularly REM sleep. REM sleep is essential for emotional processing and memory consolidation. Poor-quality sleep from alcohol use reduces resilience and worsens next-day stress responses.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 141,
    question: 'Nutrition impacts resilience because:',
    options: [
      'Food only affects physical energy, not mental health',
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
      'Eating more food always improves mood',
      'Diet has been proven to have no effect on mental health',
    ],
    correctAnswer: 1,
    explanation:
      "The brain consumes approximately 20% of the body's energy. Nutrient-poor diets, blood sugar crashes (from sugary snacks), and dehydration directly impair cognitive function, emotional regulation, and stress management.",
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 142,
    question:
      'A colleague confides in you about feeling suicidal. The most appropriate immediate response is to:',
    options: [
      'Tell them to cheer up and not be silly',
      'Listen without judgement, take it seriously, stay with them, and help them contact a crisis service such as Samaritans (116 123) or 999 if in immediate danger',
      'Change the subject to something lighter',
      'Promise to keep it a secret and not tell anyone',
    ],
    correctAnswer: 1,
    explanation:
      'Suicidal thoughts must always be taken seriously. Listen non-judgementally, ask directly about their safety, stay with them, and help them contact professional support. The Samaritans (116 123) are available 24/7. If there is immediate danger, call 999.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 143,
    question: 'The concept of "saying no" as a resilience skill means:',
    options: [
      'Refusing to do any work you do not enjoy',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
      'Being rude and unhelpful to colleagues',
      'Never agreeing to help anyone under any circumstances',
    ],
    correctAnswer: 1,
    explanation:
      'Saying no is an assertive communication skill. It means protecting your capacity by declining requests that would overload you, while explaining why and offering alternatives where possible. It preserves resilience by preventing chronic overcommitment.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 144,
    question:
      'An electrician working 60+ hours per week to meet financial pressures is at risk because:',
    options: [
      'Extra hours always improve financial security with no downsides',
      'Chronic overwork depletes physical and mental resources, impairs safety, damages relationships, and ultimately reduces overall performance and resilience',
      'Working more hours is always the best solution to financial problems',
      'The human body can sustain any number of working hours indefinitely',
    ],
    correctAnswer: 1,
    explanation:
      'Research shows that sustained overwork beyond 48 hours significantly increases accident risk, impairs cognitive function, damages health, and erodes relationships. The short-term financial gain is offset by long-term costs to health, safety, and wellbeing.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 145,
    question: 'The relationship between caffeine consumption and resilience is that:',
    options: [
      'Caffeine has no effect on stress or resilience',
      'Moderate caffeine can improve alertness, but excessive consumption increases anxiety, disrupts sleep, and triggers the stress response',
      'Maximum caffeine consumption is always beneficial for performance',
      'Caffeine permanently increases resilience',
    ],
    correctAnswer: 1,
    explanation:
      'Moderate caffeine (up to 400mg/day, about 4 cups of coffee) can improve alertness and focus. However, excessive caffeine increases cortisol, triggers anxiety symptoms, and disrupts sleep — all of which undermine resilience. Timing also matters: caffeine after 2pm can impair sleep.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 146,
    question:
      'A site manager notices that absence rates increase sharply every Monday and Friday. From a resilience perspective, this pattern most likely indicates:',
    options: [
      'Workers are taking long weekends for holiday',
      'Potential burnout, disengagement, or avoidant coping across the workforce, warranting investigation into working conditions and stress levels',
      'Workers are lazy and need disciplinary action',
      'The weekend is too long and should be shortened',
    ],
    correctAnswer: 1,
    explanation:
      'Monday/Friday absence patterns often signal workforce-level stress, burnout, or disengagement rather than individual laziness. A resilience-informed approach investigates root causes (demands, control, support) rather than jumping to disciplinary action.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 147,
    question: 'Sleep hygiene for shift workers or those with early starts should include:',
    options: [
      'Staying up late regardless of start time to maximise personal time',
      'Darkening the bedroom, limiting screen time before sleep, maintaining routines, and prioritising 7-9 hours even if sleep times are unconventional',
      'Relying on sleeping pills every night',
      'Sleeping only when you feel tired, regardless of schedule',
    ],
    correctAnswer: 1,
    explanation:
      'Shift workers and early starters need consistent sleep routines adapted to their schedule. Blackout curtains, reduced screen exposure (blue light), consistent bed/wake times, and protecting 7-9 hours are all important for maintaining cognitive function and resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 148,
    question: 'Citizens Advice can help construction workers with:',
    options: [
      'Only housing-related issues',
      'A wide range of issues including debt, employment rights, benefits, tax, and consumer problems — all free and confidential',
      'Only legal disputes with employers',
      'Medical diagnoses and treatment',
    ],
    correctAnswer: 1,
    explanation:
      'Citizens Advice provides free, confidential advice on debt, employment rights, benefits, tax, housing, consumer issues, and more. For construction workers facing financial or employment stress, it is an accessible first point of contact.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 149,
    question:
      "The Working Time Regulations 1998 provide for a rest break of at least 20 minutes when a worker's daily working time exceeds:",
    options: ['4 hours', '6 hours', '8 hours', '10 hours'],
    correctAnswer: 1,
    explanation:
      'Workers are entitled to an uninterrupted rest break of at least 20 minutes when their daily working time exceeds 6 hours. This break should be taken during the shift, not at the beginning or end, to support recovery and concentration.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 150,
    question:
      'Social isolation on site (for example, a solo electrician on a long project) is a resilience risk factor because:',
    options: [
      'Working alone is always more productive',
      'It removes the protective buffer of social support, increases rumination, and reduces opportunities to talk about difficulties',
      'Solo workers are always happier than those in teams',
      'Isolation only affects people who are naturally extroverted',
    ],
    correctAnswer: 1,
    explanation:
      'Social isolation removes one of the strongest protective factors against stress: social support. Without colleagues to talk to, problems can seem larger, rumination increases, and early warning signs of stress may go unnoticed by others.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 151,
    question: 'A practical step an electrician can take to reduce financial stress is:',
    options: [
      'Ignoring tax obligations and hoping they go away',
      'Setting aside a fixed percentage of each payment for tax, maintaining a simple budget, and building an emergency fund',
      'Borrowing from a payday lender to cover gaps between contracts',
      'Working in the cash economy to avoid CIS deductions',
    ],
    correctAnswer: 1,
    explanation:
      'Proactive financial management — setting aside tax, budgeting, and building reserves — directly reduces one of the biggest sources of stress for self-employed construction workers. This is problem-focused coping applied to financial wellbeing.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 152,
    question: 'A Mental Health First Aider on a construction site is trained to:',
    options: [
      'Diagnose mental health conditions and prescribe treatment',
      'Recognise signs of mental ill-health, provide initial support, and signpost to appropriate professional help',
      'Replace the need for professional mental health services entirely',
      'Conduct formal counselling sessions',
    ],
    correctAnswer: 1,
    explanation:
      'Mental Health First Aiders are trained to spot early signs, provide initial reassurance and support, and guide people towards appropriate professional help. They are not therapists or diagnosticians — they bridge the gap between struggling and getting help.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 153,
    question:
      'Regular exercise of at least 150 minutes per week is recommended by the NHS because it:',
    options: [
      'Guarantees you will never experience mental health problems',
      'Reduces the risk of depression by up to 30%, improves sleep, reduces anxiety, and enhances cognitive function',
      'Only benefits physical health, not mental health',
      'Is only beneficial if done at a gym with professional equipment',
    ],
    correctAnswer: 1,
    explanation:
      'The NHS recommends 150 minutes of moderate exercise per week. Research shows this reduces depression risk by approximately 30%, improves sleep quality, reduces anxiety, and enhances cognitive function. Walking, cycling, and swimming all count.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 154,
    question:
      'A sub-contractor who routinely agrees to unrealistic deadlines because they fear losing the client is demonstrating:',
    options: [
      'Excellent customer service and business acumen',
      'Poor boundary setting that will lead to chronic overwork, quality reduction, and eventual burnout',
      'The correct approach to growing a successful business',
      'High resilience by accepting every challenge',
    ],
    correctAnswer: 1,
    explanation:
      'Consistently accepting unrealistic deadlines is a boundary failure. While it may maintain one client relationship short-term, it creates chronic overwork, compromises quality, damages health, and ultimately reduces the ability to serve any client well.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 155,
    question:
      'The impact of peripatetic (travelling) work on construction worker resilience includes:',
    options: [
      'Only positive effects — travel broadens the mind',
      'Time away from family and support networks, disrupted routines, social isolation, and difficulty maintaining healthy habits',
      'No measurable impact on mental health',
      'It only affects workers who travel internationally',
    ],
    correctAnswer: 1,
    explanation:
      'Peripatetic working means time away from family and established support networks, difficulty maintaining exercise, sleep, and eating routines, social isolation in unfamiliar locations, and loneliness. These factors collectively increase vulnerability to stress and mental ill-health.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 156,
    question:
      'An electrician who has been made redundant can access support from the Lighthouse Club for:',
    options: [
      'Only financial grants for physical injuries',
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'Only help finding a new job within 24 hours',
      'Free electrical tools and equipment',
    ],
    correctAnswer: 1,
    explanation:
      'The Lighthouse Club provides holistic support for construction workers in crisis: emergency financial grants, emotional wellbeing support, legal advice, and career guidance. Their 24/7 helpline (0345 605 1956) is available for anyone in the construction industry.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 157,
    question:
      'The concept of "presenteeism" — being at work but not functioning effectively — is a resilience concern because:',
    options: [
      'It means workers are always present and therefore reliable',
      'It indicates workers are pushing through when depleted, reducing productivity, increasing error rates, and delaying genuine recovery',
      'It is a positive sign of dedication to the job',
      'It only occurs in office-based work, not construction',
    ],
    correctAnswer: 1,
    explanation:
      'Presenteeism is often more costly than absence because the worker is present but impaired: concentration is poor, errors increase, and recovery is delayed. In construction, this creates genuine safety risks. Resilience means recognising when rest is needed.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 158,
    question: 'An effective buddy system on a construction site supports resilience by:',
    options: [
      'Adding bureaucracy and slowing down work',
      'Ensuring workers look out for each other, notice behavioural changes early, and have someone to talk to regularly',
      'Replacing the need for professional mental health support',
      'Only benefiting apprentices, not experienced workers',
    ],
    correctAnswer: 1,
    explanation:
      'Buddy systems create natural peer support structures. Regular interaction means behavioural changes (early stress signs) are noticed sooner, workers have a trusted person to talk to, and the culture shifts towards mutual support rather than isolated stoicism.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 159,
    question:
      "When a self-employed electrician's income drops unexpectedly, resilience-building financial advice would be to:",
    options: [
      'Immediately take out a high-interest payday loan',
      'Assess the situation calmly, contact HMRC about Time to Pay if needed, speak to StepChange or Citizens Advice, and adjust spending to essentials',
      'Ignore all bills until income recovers',
      'Sell all tools and equipment immediately',
    ],
    correctAnswer: 1,
    explanation:
      'A calm, systematic response is the resilience approach: assess the situation, engage support services (HMRC, StepChange, Citizens Advice), adjust spending, and communicate with creditors. Panic decisions like payday loans typically make the situation worse.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 160,
    question:
      'The single most consistently evidence-supported protective factor against stress and mental ill-health is:',
    options: [
      'High income',
      'Strong, supportive social relationships',
      'Living in a warm climate',
      'Having a university degree',
    ],
    correctAnswer: 1,
    explanation:
      'Decades of research consistently identify strong social relationships as the single most powerful protective factor against stress, mental ill-health, and even premature death. This applies across cultures, ages, and socioeconomic groups.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  // ─── CATEGORY 5: Switching Off & Sustaining Wellbeing (161-200) ───
  {
    id: 161,
    question: 'The performance-recovery cycle describes:',
    options: [
      'A cycle of hiring and firing employees based on performance reviews',
      'The principle that sustained high performance requires deliberate periods of recovery, and neglecting recovery leads to declining performance',
      'A weight-training technique alternating heavy and light days',
      'The business cycle of profit and loss',
    ],
    correctAnswer: 1,
    explanation:
      'The performance-recovery cycle shows that performance is not sustainable without adequate recovery. Like a muscle that needs rest between workouts, the mind and body require deliberate recovery periods to maintain and improve performance over time.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 162,
    question: 'Micro-recovery refers to:',
    options: [
      'Recovering micro-components from electrical waste',
      'Short recovery activities taken during the working day, such as brief walks, breathing exercises, or short breaks from a demanding task',
      'A very small financial recovery from a debt',
      'Recovering from a micro-sleep during work',
    ],
    correctAnswer: 1,
    explanation:
      'Micro-recovery involves brief (minutes-long) recovery activities within the working day: a short walk, a breathing exercise, a tea break with a colleague, or simply pausing between tasks. These small interventions prevent stress from accumulating throughout the day.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 163,
    question: 'A transition ritual is:',
    options: [
      'A ceremony performed when moving to a new construction site',
      'A deliberate routine that helps you mentally shift from work mode to personal mode at the end of the day',
      'A religious practice performed before starting work',
      'A formal handover procedure between day and night shifts',
    ],
    correctAnswer: 1,
    explanation:
      'Transition rituals help the brain switch from "work mode" to "home mode." Examples include changing clothes, listening to music during the commute, going for a walk, or having a cup of tea. Without this deliberate transition, work thoughts continue to intrude into personal time.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 164,
    question: 'Rumination is:',
    options: [
      'A positive reflection practice that improves wellbeing',
      'Repetitive, circular thinking about problems, worries, or negative events that does not lead to solutions',
      'Carefully reviewing a technical problem to find a solution',
      'The process of digestion in animals with multiple stomachs',
    ],
    correctAnswer: 1,
    explanation:
      'Rumination is repetitive, unproductive thinking that circles around problems without moving towards solutions. Unlike constructive reflection, rumination amplifies negative emotions, disrupts sleep, and prevents genuine recovery. It is a key barrier to switching off from work.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 165,
    question:
      'Maslach and Leiter identified three dimensions of burnout. Which of the following is one of them?',
    options: [
      'Physical injury',
      'Emotional exhaustion',
      'Financial bankruptcy',
      'Career advancement',
    ],
    correctAnswer: 1,
    explanation:
      "Maslach and Leiter's three dimensions of burnout are: emotional exhaustion (feeling completely drained), depersonalisation (cynicism and detachment from work), and reduced personal accomplishment (feeling ineffective). All three must be present for clinical burnout.",
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 166,
    question: 'Burnout differs from normal stress in that burnout:',
    options: [
      'Is simply a more intense version of everyday stress',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      "Can be fixed by a single good night's sleep",
      'Only affects people who do not enjoy their work',
    ],
    correctAnswer: 1,
    explanation:
      'Burnout is not just "being very stressed." It is a distinct syndrome involving deep emotional exhaustion, cynical detachment (depersonalisation), and a pervasive sense of ineffectiveness. Recovery from burnout typically takes months, not days.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 167,
    question: 'Digital detox in the context of resilience refers to:',
    options: [
      'Cleaning your phone screen with disinfectant',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
      'Deleting all social media accounts permanently',
      'Upgrading to the latest smartphone',
    ],
    correctAnswer: 1,
    explanation:
      'Digital detox means intentionally reducing screen time — particularly social media, work emails, and news — to allow the brain to genuinely rest. Constant digital stimulation prevents recovery and maintains arousal levels that inhibit switching off.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 168,
    question: 'The Samaritans helpline can be reached on:',
    options: ['999', '116 123', '101', '111'],
    correctAnswer: 1,
    explanation:
      'The Samaritans are available 24 hours a day, 365 days a year on 116 123 (free from any phone). They provide confidential emotional support for anyone experiencing distress, despair, or suicidal thoughts. The number is free and does not appear on phone bills.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 169,
    question: "Andy's Man Club is:",
    options: [
      "A private members' club for networking",
      "A men's mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings",
      'A fitness club for construction workers',
      'A trade union for men in the construction industry',
    ],
    correctAnswer: 1,
    explanation:
      "Andy's Man Club runs free, peer-support talking groups for men on Monday evenings across the UK. Named after Andy Roberts, who took his own life in 2016, the groups provide a safe space for men to talk about their struggles. Their motto is #ITSOKAYTOTALK.",
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 170,
    question: 'CALM (Campaign Against Living Miserably) is a charity that:',
    options: [
      'Promotes quiet working environments on construction sites',
      'Leads a movement against male suicide, running a helpline (0800 58 58 58) and webchat, available 5pm to midnight every day',
      'Teaches meditation techniques exclusively',
      'Provides legal services for workplace disputes',
    ],
    correctAnswer: 1,
    explanation:
      'CALM leads a movement against suicide in men. Their helpline (0800 58 58 58) and webchat are available 5pm to midnight daily. CALM campaigns to change the culture around male mental health and challenge the expectation that men should "man up."',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 171,
    question: 'A SMART action plan for building resilience means setting goals that are:',
    options: [
      'Simple, Manageable, Attractive, Reasonable, Thoughtful',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Strategic, Meaningful, Appropriate, Results-oriented, Trackable',
      'Small, Moderate, Ambitious, Risky, Testing',
    ],
    correctAnswer: 1,
    explanation:
      'SMART goals are Specific (clear and defined), Measurable (you can track progress), Achievable (realistic), Relevant (aligned to your needs), and Time-bound (with a deadline). This framework turns vague intentions into actionable resilience-building commitments.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 172,
    question: 'Personal "resilience non-negotiables" are:',
    options: [
      'Employment contract terms you refuse to change',
      'The minimum set of self-care activities you commit to maintaining regardless of how busy or stressed you are',
      'Legal rights that cannot be waived',
      'The absolute minimum wage you will accept',
    ],
    correctAnswer: 1,
    explanation:
      'Resilience non-negotiables are the baseline self-care commitments you protect no matter what: for example, 7 hours of sleep, a daily walk, one phone call to a friend per week. These prevent the downward spiral of abandoning healthy habits when stress increases.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 173,
    question: 'An early warning system for stress involves:',
    options: [
      'Installing a fire alarm system on site',
      'Identifying your personal early signs of stress (such as disturbed sleep, irritability, or appetite changes) so you can take action before reaching crisis point',
      'Monitoring weather warnings before outdoor work',
      'Setting up email alerts for industry news',
    ],
    correctAnswer: 1,
    explanation:
      'Personal early warning systems involve knowing your own stress signatures — the first signs that you are becoming stressed. By recognising these early (perhaps through a stress diary), you can intervene with coping strategies before the stress escalates to crisis.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 174,
    question: 'Building a support network involves:',
    options: [
      'Having as many social media followers as possible',
      'Deliberately cultivating relationships across different areas of life — work, family, friends, community — so support is available from multiple sources',
      'Relying entirely on one person for all your support needs',
      'Only connecting with people who agree with everything you say',
    ],
    correctAnswer: 1,
    explanation:
      'A robust support network includes diverse relationships: trusted colleagues, family, friends, community connections, and professional support when needed. Relying on a single person creates vulnerability if that relationship is disrupted.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 175,
    question: 'Meso-recovery refers to:',
    options: [
      'Recovery during a mesocycle of athletic training',
      'Recovery over evenings and weekends — the daily and weekly recovery periods between work shifts',
      'Recovery from a medium-sized financial loss',
      'The middle phase of injury rehabilitation',
    ],
    correctAnswer: 1,
    explanation:
      'Meso-recovery describes the recovery that happens between work periods: evenings and weekends. This is where transition rituals, hobbies, social connection, and genuine leisure restore the energy and mental resources depleted during working hours.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 176,
    question: 'Macro-recovery refers to:',
    options: [
      'Recovery from a major surgical operation',
      'Extended recovery periods such as holidays and annual leave that allow deeper restoration than daily or weekly recovery can achieve',
      'Large-scale economic recovery after a recession',
      'Recovery of large machinery after a breakdown',
    ],
    correctAnswer: 1,
    explanation:
      'Macro-recovery involves longer breaks — holidays, extended time off, sabbaticals. These provide deeper restoration that daily and weekly recovery cannot achieve, allowing accumulated fatigue and stress to fully dissipate and resilience reserves to be replenished.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 177,
    question: 'Which technique is most effective for breaking a rumination cycle?',
    options: [
      'Thinking harder about the problem until you find a solution',
      'Engaging in an absorbing activity that demands attention, such as physical exercise, a hobby, or a mindfulness exercise',
      'Lying in bed trying to clear your mind completely',
      'Discussing the same problem repeatedly with different people',
    ],
    correctAnswer: 1,
    explanation:
      'Rumination is broken by redirecting attention to activities that demand cognitive engagement. Exercise, absorbing hobbies, or mindfulness practice interrupt the repetitive thought cycle. Trying to suppress thoughts paradoxically intensifies them.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 178,
    question: 'Depersonalisation, as a dimension of burnout, manifests as:',
    options: [
      'Forgetting your own name due to stress',
      'Cynicism, detachment from work, treating colleagues or clients as objects rather than people, and emotional withdrawal',
      'Losing your personal belongings on site',
      'A psychiatric condition involving feeling detached from your body',
    ],
    correctAnswer: 1,
    explanation:
      'Depersonalisation in burnout context means developing a cynical, detached attitude towards work and the people in it. An electrician might stop caring about quality, become dismissive of clients, or withdraw emotionally from colleagues. It is a defence mechanism against exhaustion.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 179,
    question: '"Reduced personal accomplishment" in the burnout model means:',
    options: [
      'A genuine reduction in the quality of work produced',
      'A pervasive feeling that nothing you do matters, that you are ineffective, and that your work has no value — regardless of actual performance',
      'Being demoted at work due to poor performance',
      'Receiving fewer qualifications than planned',
    ],
    correctAnswer: 1,
    explanation:
      'Reduced personal accomplishment is the subjective feeling of inefficacy — "nothing I do makes a difference." The person may actually be performing adequately but feels fundamentally ineffective. This self-perception further drains motivation and deepens burnout.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 180,
    question: 'A key warning sign that stress is progressing towards burnout is:',
    options: [
      'Feeling energised and motivated by your work',
      'A persistent sense that rest and time off no longer restore your energy — you feel tired even after a weekend or holiday',
      'Feeling normal tiredness at the end of a busy day',
      'Wanting to improve your skills through training',
    ],
    correctAnswer: 1,
    explanation:
      'When normal recovery stops working — when a weekend or holiday no longer restores energy — this is a critical warning sign. Normal stress responds to rest; approaching burnout means the depletion is too deep for routine recovery to address.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 181,
    question: 'Recovery from clinical burnout typically takes:',
    options: [
      'A single good weekend',
      'Several months to over a year, depending on severity and support',
      'Exactly two weeks of annual leave',
      '24 hours of sleep',
    ],
    correctAnswer: 1,
    explanation:
      'Burnout recovery is not quick. Research indicates that recovering from established burnout typically takes months, sometimes over a year. This underscores the importance of early intervention — catching the warning signs before reaching full burnout.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 182,
    question:
      'Checking work emails or messages during evening personal time undermines recovery because:',
    options: [
      'It has no effect on recovery — it only takes a moment',
      'It prevents psychological detachment from work, keeping the brain in a state of partial work-mode arousal and inhibiting genuine rest',
      'It uses too much phone battery',
      'It annoys your family but does not affect your health',
    ],
    correctAnswer: 1,
    explanation:
      'Even brief work email checks trigger work-related cognitive activation, preventing genuine psychological detachment. Research shows that the inability to mentally disconnect from work during off-hours is one of the strongest predictors of poor recovery and eventual burnout.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 183,
    question: 'An effective transition ritual for an electrician finishing a shift might be:',
    options: [
      'Continuing to think about work problems while driving home',
      'Changing out of work clothes on site, listening to a podcast during the drive, and having a specific routine (such as a cup of tea) upon arriving home',
      'Immediately checking work emails upon arriving home',
      'Complaining about work to family members for the first hour at home',
    ],
    correctAnswer: 1,
    explanation:
      'Effective transition rituals use physical and psychological cues to signal the shift from work to personal life. Changing clothes, a specific drive-time activity, and a home arrival routine all help the brain transition out of work mode.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 184,
    question: 'Signposting in mental health support means:',
    options: [
      'Installing road signs on a construction site',
      'Directing someone to appropriate professional support services, providing names, numbers, and resources relevant to their needs',
      'Pointing at someone and telling them they need help',
      'Putting up mental health posters on the site notice board',
    ],
    correctAnswer: 1,
    explanation:
      "Signposting means guiding someone towards the right help: providing specific service names, phone numbers, and resources. Good signposting matches the person's needs to the appropriate service (Samaritans for crisis, Lighthouse Club for construction-specific support, GP for clinical concerns).",
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 185,
    question: 'A SMART resilience goal example for a stressed electrician might be:',
    options: [
      '"I will try to be less stressed"',
      '"I will do Box Breathing for 3 minutes during my lunch break every working day for the next 4 weeks, and track how I feel before and after"',
      '"I will become completely stress-free by next month"',
      '"I will think about exercising sometime soon"',
    ],
    correctAnswer: 1,
    explanation:
      'This goal is Specific (Box Breathing, 3 minutes, lunch break), Measurable (tracking feelings), Achievable (3 minutes is realistic), Relevant (addresses stress), and Time-bound (4 weeks). Vague goals like "be less stressed" lack the structure needed for action.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 186,
    question: 'The concept of "psychological detachment" from work during leisure time means:',
    options: [
      'Developing a dissociative disorder',
      'Mentally disengaging from work-related thoughts and activities, allowing genuine cognitive and emotional recovery',
      'Quitting your job to detach from it permanently',
      'Being emotionally detached from your colleagues during work',
    ],
    correctAnswer: 1,
    explanation:
      'Psychological detachment (Sonnentag & Fritz) means mentally "switching off" from work during non-work time. Research consistently shows that people who achieve psychological detachment recover better, sleep better, and report higher wellbeing and sustained performance.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 187,
    question:
      'An electrician notices he has become cynical about his work, no longer cares about the quality of his installations, and feels emotionally numb. These are signs of:',
    options: [
      'Normal work experience that everyone has',
      'Burnout — specifically the depersonalisation and emotional exhaustion dimensions',
      'Simply needing a new challenge at work',
      'Being naturally introverted',
    ],
    correctAnswer: 1,
    explanation:
      'Cynicism about work, indifference to quality, and emotional numbness are hallmark signs of burnout, particularly depersonalisation (cynical detachment) and emotional exhaustion. This pattern warrants immediate attention, not dismissal as normal.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 188,
    question: 'A colleague returning to work after burnout should ideally:',
    options: [
      'Return to full workload immediately to show they are recovered',
      'Have a phased return with gradually increasing demands, regular check-ins, and clear boundaries to prevent relapse',
      'Be given the most difficult tasks to prove they can handle them',
      'Be avoided by colleagues because burnout might be contagious',
    ],
    correctAnswer: 1,
    explanation:
      'Burnout recovery requires careful return-to-work management. A phased return with gradual increases in workload, regular check-ins, clear boundaries, and workplace adjustments (where appropriate) helps prevent relapse. Returning to the same conditions that caused burnout risks recurrence.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 189,
    question:
      'Research on rumination shows that it differs from constructive problem-solving because rumination:',
    options: [
      'Always leads to effective solutions',
      'Is passive and repetitive, focusing on "why" and "what if" without generating actionable steps, whereas problem-solving is active and goal-directed',
      'Is more efficient than structured thinking',
      'Only happens during the daytime',
    ],
    correctAnswer: 1,
    explanation:
      'Rumination circles around "Why did this happen?" and "What if it gets worse?" without moving towards action. Problem-solving asks "What can I do about it?" and generates concrete steps. Recognising whether you are ruminating or problem-solving is a critical resilience skill.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 190,
    question: 'The "worry window" technique for managing rumination involves:',
    options: [
      'Worrying while looking out of a window',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Installing worry-free windows on site',
      'Opening a window to let fresh air reduce worry',
    ],
    correctAnswer: 1,
    explanation:
      'The worry window technique involves containing rumination to a designated 15-minute slot. When worry intrudes outside this time, it is noted and postponed to the window. This breaks the pattern of all-day rumination and gives the person control over when they engage with worries.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 191,
    question: 'Burnout is formally recognised by the World Health Organisation (WHO) as:',
    options: [
      'A clinical mental health disorder',
      'An occupational phenomenon resulting from chronic workplace stress that has not been successfully managed',
      'A physical disease of the adrenal glands',
      'A normal and inevitable part of working life',
    ],
    correctAnswer: 1,
    explanation:
      'The WHO classifies burnout in ICD-11 as an "occupational phenomenon" — not a medical condition but a syndrome resulting from chronic workplace stress that has not been successfully managed. This classification emphasises that workplace factors, not individual weakness, are the primary cause.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 192,
    question:
      'An electrician who used to enjoy their work but now dreads going in, feels they are "running on empty," and has started calling in sick regularly is most likely experiencing:',
    options: [
      'Laziness and lack of motivation',
      'The progression from chronic stress into burnout, characterised by emotional exhaustion, loss of engagement, and withdrawal',
      'A normal reaction to a busy period that will resolve on its own',
      'The need for a pay rise',
    ],
    correctAnswer: 1,
    explanation:
      'The progression from enjoyment to dread, persistent exhaustion despite rest, and increased absence are classic indicators of burnout development. This pattern requires intervention — changes to workload, support, and possibly professional help — not dismissal.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 193,
    question: 'When creating a personal resilience plan, the first step should be:',
    options: [
      'Immediately setting ambitious goals for change',
      'Conducting an honest self-assessment of current stress levels, coping strategies, and support networks to establish a baseline',
      'Buying expensive self-help books',
      'Telling everyone about your plan before starting it',
    ],
    correctAnswer: 1,
    explanation:
      'Effective resilience planning starts with honest self-assessment: What are your current stress levels? What coping strategies do you use? What support do you have? This baseline enables targeted, realistic goal-setting rather than generic or overambitious plans.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 194,
    question: 'The Lighthouse Club helpline number is:',
    options: ['0800 58 58 58', '0345 605 1956', '116 123', '999'],
    correctAnswer: 1,
    explanation:
      'The Lighthouse Club helpline is 0345 605 1956, available 24/7 for construction workers and their families. It provides emotional, financial, and practical support. This is distinct from CALM (0800 58 58 58) and Samaritans (116 123).',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 195,
    question: 'Sustaining wellbeing over the long term requires:',
    options: [
      'A single major life change that fixes everything permanently',
      'Ongoing, consistent maintenance of healthy habits, relationships, and coping strategies — treating wellbeing as a continuous practice, not a destination',
      'Complete elimination of all stress from your life',
      'Achieving a state where you never need support from others',
    ],
    correctAnswer: 1,
    explanation:
      'Wellbeing is maintained through consistent, ongoing practice — not a one-off fix. Just as physical fitness requires regular exercise, mental fitness requires regular maintenance of healthy habits, social connections, and coping strategies throughout life.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 196,
    question: 'The concept of "emotional exhaustion" in the Maslach burnout model describes:',
    options: [
      'Being tired after a physically demanding shift',
      'A chronic state of feeling emotionally drained, overwhelmed, and unable to face the emotional demands of work or life',
      'Crying once after a bad day at work',
      'Feeling exhausted because of a diagnosed sleep disorder',
    ],
    correctAnswer: 1,
    explanation:
      'Emotional exhaustion is a chronic state — not a one-off bad day — where emotional resources are depleted. The person feels they have nothing left to give emotionally. It is the central component of burnout and often the first dimension to develop.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 197,
    question:
      'When signposting a construction worker who is in immediate crisis and expressing suicidal intent, the priority is to:',
    options: [
      'Give them a leaflet and leave them alone to read it',
      'Stay with them, listen non-judgementally, and help them contact emergency services (999) or the Samaritans (116 123) — do not leave them alone',
      'Tell them things could be worse',
      'Promise to keep it completely secret from everyone',
    ],
    correctAnswer: 1,
    explanation:
      'In an immediate crisis with suicidal intent: stay with the person, listen without judgement, ask directly about their safety, and help them contact professional help (999 for immediate danger, Samaritans 116 123 for emotional support). Never leave someone in active crisis alone.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 198,
    question: 'An effective personal early warning system for burnout would include:',
    options: [
      'Ignoring warning signs until they become severe',
      'A written list of your personal early indicators (e.g., sleep disruption, irritability, loss of interest), regular self-check-ins, and a trusted person who can give honest feedback',
      'Only monitoring physical symptoms, never emotional ones',
      'Waiting for your annual performance review to find out how you are doing',
    ],
    correctAnswer: 1,
    explanation:
      'An early warning system combines self-awareness (knowing your personal indicators), regular practice (weekly self-check-ins), and external input (a trusted person who knows your baseline and can spot changes you might miss). Written documentation makes the system more reliable.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 199,
    question:
      'The relationship between all five categories in this course — understanding stress, building resilience, coping strategies, daily habits, and sustaining wellbeing — is best described as:',
    options: [
      'Five separate topics with no connection to each other',
      'An integrated system where each element supports and reinforces the others, creating a comprehensive framework for long-term mental fitness',
      'A hierarchy where only the most advanced topics matter',
      'A sequence that only needs to be studied once',
    ],
    correctAnswer: 1,
    explanation:
      'The five areas form an integrated system: understanding stress provides the foundation, resilience builds capacity, coping strategies provide tools, daily habits create consistency, and sustaining wellbeing ensures longevity. Each reinforces the others in a continuous cycle.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 200,
    question:
      'An electrician has completed this course and wants to maintain their resilience over the coming year. The most effective approach is to:',
    options: [
      'Consider the course complete and move on without further thought',
      'Select 2-3 SMART resilience non-negotiables, build them into daily routines, regularly review and adjust them, and know who to contact if they need support',
      'Try to implement all 200 concepts simultaneously from tomorrow',
      'Wait until they feel stressed before applying anything they learned',
    ],
    correctAnswer: 1,
    explanation:
      'Sustainable change comes from selecting a small number of specific, achievable commitments and integrating them into daily life. Regular review allows adjustment as circumstances change. Knowing support resources ensures help is accessible before crisis point is reached.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
];

export const getRandomRSMExamQuestions = (count: number): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(rsmQuestionBank, count, rsmCategories);
};
