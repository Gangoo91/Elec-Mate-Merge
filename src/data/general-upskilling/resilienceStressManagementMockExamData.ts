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
      'Alarm, Exhaustion, Resistance',
      'Alarm, Resistance, Exhaustion',
      'Resistance, Alarm, Exhaustion',
      'Exhaustion, Alarm, Resistance',
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
      'The immune system strengthens to prepare for future stressors',
      'The body releases cortisol and adrenaline, triggering the fight-or-flight response',
      'The body enters a state of deep relaxation to conserve energy',
    ],
    correctAnswer: 2,
    explanation:
      'During the Alarm stage, the body perceives a threat and activates the sympathetic nervous system, releasing stress hormones such as cortisol and adrenaline. This triggers the fight-or-flight response, preparing the body for immediate action.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 3,
    question: 'Which term describes positive, motivating stress that enhances performance?',
    options: [
      'Distress',
      'Acute stress disorder',
      'Chronic stress',
      'Eustress',
    ],
    correctAnswer: 3,
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
      'Assessing whether the situation is irrelevant, benign-positive, or stressful',
      'Deciding whether to use problem-focused or emotion-focused coping',
      'Evaluating what coping resources are available to deal with the stressor',
      'Measuring the physiological impact of the stressor on the body',
    ],
    correctAnswer: 0,
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
      'A downward slope — any arousal reduces performance',
      'A straight upward line — more arousal always means better performance',
      'An inverted-U curve — performance peaks at moderate arousal then declines',
      'A flat line — arousal has no measurable effect on performance',
    ],
    correctAnswer: 2,
    explanation:
      'The Yerkes-Dodson Law shows an inverted-U relationship: performance improves with increasing arousal up to an optimal point, then declines as arousal becomes excessive. This explains why some pressure helps but too much is harmful.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 7,
    question:
      'Which of the following is NOT one of the six HSE Management Standards areas for work-related stress?',
    options: [
      'Support',
      'Demands',
      'Relationships',
      'Salary',
    ],
    correctAnswer: 3,
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
      'Health, safety, and welfare at work of all employees',
      'Profitability of the business at all times',
      'Happiness and job satisfaction of every worker',
      'Physical fitness of all employees through mandatory exercise',
    ],
    correctAnswer: 0,
    explanation:
      'HSWA 1974 Section 2 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This includes mental health and managing work-related stress.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 9,
    question: 'Which physical symptom is commonly associated with chronic stress?',
    options: [
      'Deeper, more restful sleep',
      'Persistent headaches and muscle tension',
      'Increased appetite with healthy food choices',
      'Improved immune function',
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
      'They need stricter supervision and more frequent checks',
      'They may be experiencing significant stress and should be approached with concern',
      'They are probably just tired and will recover after the weekend',
    ],
    correctAnswer: 2,
    explanation:
      'Behavioural changes such as withdrawal, irritability, and increased errors are classic signs of stress. Approaching the person with genuine concern, rather than judgement, is the appropriate first response and can open the door to support.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 11,
    question:
      'Which hormone is primarily responsible for the sustained stress response when a threat persists?',
    options: [
      'Insulin',
      'Serotonin',
      'Melatonin',
      'Cortisol',
    ],
    correctAnswer: 3,
    explanation:
      'Cortisol is released by the adrenal glands during sustained stress. While adrenaline triggers the immediate fight-or-flight response, cortisol maintains the body in a state of heightened alertness over longer periods, which can be damaging if prolonged.',
    category: 'Understanding Stress',
    difficulty: 'basic' as const,
  },
  {
    id: 12,
    question: 'The fight-flight-freeze response is controlled by which part of the nervous system?',
    options: [
      'The sympathetic nervous system',
      'The parasympathetic nervous system',
      'The central nervous system only',
      'The enteric nervous system',
    ],
    correctAnswer: 0,
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
      'They may be experiencing significant stress and should be approached with concern',
      'Increased risk-taking and poor concentration leading to safety errors',
      'Unacceptable behaviour such as bullying, harassment, and conflict at work',
      'The negative effects of a setback will last forever and the situation will never improve',
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
      'Paying attention to the present moment, on purpose, without judgement',
      'A relatively high level of arousal, as the task requires less cognitive effort',
      'Negative stress that overwhelms coping ability and impairs functioning',
      'Believing that a setback in one area of life will undermine all other areas',
    ],
    correctAnswer: 2,
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
      'Performance improves but only for physical tasks',
      'Performance remains stable regardless of arousal',
      'Performance deteriorates significantly',
    ],
    correctAnswer: 3,
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
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
      'The negative effects of a setback will last forever and the situation will never improve',
      'An inverted-U curve — performance peaks at moderate arousal then declines',
    ],
    correctAnswer: 0,
    explanation:
      'MHSWR 1999 Regulation 3 requires a suitable and sufficient risk assessment covering all risks to health and safety, which includes work-related stress. Employers must identify hazards and implement proportionate control measures.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 17,
    question: 'The HSE Management Standard for "Control" relates to:',
    options: [
      'The ability of HR to control absence rates',
      'How much say a person has in the way they do their work',
      'How well managers control the behaviour of their teams',
      'The level of CCTV and monitoring on a construction site',
    ],
    correctAnswer: 1,
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
      'Financial services workers',
      'Construction workers',
      'Agricultural workers',
    ],
    correctAnswer: 2,
    explanation:
      'Construction workers have the highest rate of suicide of any major occupation group in the UK. ONS data consistently shows construction workers are at significantly elevated risk, making mental health awareness in the industry critically important.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 19,
    question: 'In the context of stress, what does "cognitive symptoms" refer to?',
    options: [
      'Believing that a setback in one area of life will undermine all other areas',
      'You must completely empty your mind of all thoughts for it to work',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
      'Difficulty concentrating, racing thoughts, poor memory, and indecisiveness',
    ],
    correctAnswer: 3,
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
      'Work-related stress manifesting across physical, emotional, and behavioural domains',
      'Assuming you know what your supervisor thinks about you without any evidence — "He thinks I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m useless"',
      'The willingness to try new experiences, take appropriate risks, and connect with others for support',
      'Burnout — specifically the depersonalisation and emotional exhaustion dimensions',
    ],
    correctAnswer: 0,
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
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m just not good enough — some people are natural electricians and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not one of them"',
      'Recognise signs of mental ill-health, provide initial support, and signpost to appropriate professional help',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
    ],
    correctAnswer: 2,
    explanation:
      'The Role standard concerns whether workers understand their role clearly and whether conflicting demands within or between roles are avoided. Role ambiguity and role conflict are significant sources of workplace stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 23,
    question: 'Which of the following best describes the "freeze" response in fight-flight-freeze?',
    options: [
      'Choosing to ignore the stressor and carry on as normal',
      'Calmly assessing the situation before responding rationally',
      'Falling asleep due to extreme fatigue from the stressor',
      'A state of temporary immobility or dissociation when the threat feels inescapable',
    ],
    correctAnswer: 3,
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
      'Demands and Role only',
      'Support, Relationships, and Change',
      'Role, Change, and Relationships',
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
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      'Acts rapidly for the immediate fight-or-flight response, whereas cortisol sustains the longer-term stress response',
      'It protects recovery time, prevents burnout, and maintains energy for sustained performance over time',
      'Resilience is not a permanent state — it fluctuates with life circumstances and requires ongoing maintenance, regardless of experience',
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
      'The legal requirement to change risk assessments every 12 months',
      'How organisational change, large or small, is managed and communicated',
      'Moving workers between sites without notice',
    ],
    correctAnswer: 2,
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
      'Mild nervousness before a performance review',
      'Feeling proud after completing a difficult task',
      'Persistent irritability, mood swings, and disproportionate anger',
    ],
    correctAnswer: 3,
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
      'Have a private, non-judgemental conversation expressing genuine concern',
      'How organisational change, large or small, is managed and communicated',
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'Identify patterns, triggers, and the effectiveness of their coping strategies over time',
    ],
    correctAnswer: 0,
    explanation:
      'A private, non-judgemental conversation is the best first step. Simply asking "Are you alright?" in a genuine way can open the door. Reporting to management or avoiding the person may increase their isolation and stress.',
    category: 'Understanding Stress',
    difficulty: 'intermediate' as const,
  },
  {
    id: 29,
    question: 'The Resistance stage of the General Adaptation Syndrome involves:',
    options: [
      'A person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s belief in their own ability to succeed in specific situations and accomplish tasks',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m just not good enough — some people are natural electricians and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not one of them"',
      'The individual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perception of the event and their perceived ability to cope',
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
      "The body releases cortisol and adrenaline, triggering the fight-or-flight response",
      "Positive acceptance of change and secure relationships",
      "The individual's perception of the event and their perceived ability to cope",
      "Experiencing positive transformation that takes the person beyond their pre-trauma baseline",
    ],
    correctAnswer: 2,
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
      'An inverted-U curve — performance peaks at moderate arousal then declines',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Paying attention to the present moment, on purpose, without judgement',
      'A relatively high level of arousal, as the task requires less cognitive effort',
    ],
    correctAnswer: 3,
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
      'Incorrect — employers have a legal duty under HSWA 1974 and MHSWR 1999 to assess and manage work-related stress risks',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Impairs cognitive function, concentration, and mood, and increases fatigue and irritability',
      'Financial and emotional support specifically for construction workers and their families',
    ],
    correctAnswer: 0,
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
      'Average stress levels that require no intervention',
      'The highest risk of work-related stress and associated illness',
      'Low stress because high demands keep workers engaged',
    ],
    correctAnswer: 2,
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
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      'Stay with them, listen non-judgementally, and help them contact emergency services (999) or the Samaritans (116 123) — do not leave them alone',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'A combination of factors including job insecurity, peripatetic working, macho culture inhibiting help-seeking, financial pressures of self-employment, and access to means',
    ],
    correctAnswer: 3,
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
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      'Have a phased return with gradually increasing demands, regular check-ins, and clear boundaries to prevent relapse',
      'Potential burnout, disengagement, or avoidant coping across the workforce, warranting investigation into working conditions and stress levels',
    ],
    correctAnswer: 0,
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
      'Customer demands and complaints handling',
      'Financial demands placed on employees such as tool purchases',
      'Workload, work patterns, and the work environment',
      'The demand for qualified electricians in the labour market',
    ],
    correctAnswer: 2,
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
      'Social isolation, lack of support networks, and poor coping habits',
      'Health, safety, and welfare at work of all employees',
      'Positive Emotion, Engagement, Relationships, Meaning, Accomplishment',
      'Persistent feelings of dread and overwhelming anxiety',
    ],
    correctAnswer: 3,
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
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'A wide range of issues including debt, employment rights, benefits, tax, and consumer problems — all free and confidential',
    ],
    correctAnswer: 0,
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
      'Assuming you know what your supervisor thinks about you without any evidence — "He thinks I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m useless"',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
      'The cumulative wear and tear on the body from chronic activation of stress response systems',
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
      'Determined entirely by intelligence',
      'Learnable and modifiable, varying over time and context',
      'Only present in people who have never experienced trauma',
    ],
    correctAnswer: 2,
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
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      'Abilities and intelligence can be developed through effort, learning, and persistence',
    ],
    correctAnswer: 3,
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
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      'Taking practical steps to address or manage the source of the stress directly',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
    ],
    correctAnswer: 0,
    explanation:
      "Neuroplasticity — the brain's ability to reorganise and form new neural connections throughout life — provides the biological basis for building resilience. Repeated practice of resilient thinking and behaviour physically reshapes brain circuits.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 45,
    question: 'The "resilience bucket" metaphor describes:',
    options: [
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'The idea that everyone has a finite capacity for stress, and resilience involves both reducing the flow in (stressors) and increasing the flow out (coping strategies)',
      'It removes the protective buffer of social support, increases rumination, and reduces opportunities to talk about difficulties',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
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
      'Helps individuals identify their strengths and areas for development, creating a personal baseline',
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'A condition or attribute that reduces the impact of risk and supports positive adaptation',
      'Positive psychological change experienced as a result of the struggle with highly challenging life circumstances',
    ],
    correctAnswer: 2,
    explanation:
      'Protective factors are conditions, attributes, or resources that buffer against the negative effects of stress and adversity. Examples include strong social connections, problem-solving skills, sense of purpose, and emotional regulation ability.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 47,
    question: 'Which of the following is a risk factor that reduces resilience?',
    options: [
      'Regular exercise, social connection, and adequate sleep',
      'Paying attention to the present moment, on purpose, without judgement',
      'Health, safety, and welfare at work of all employees',
      'Social isolation, lack of support networks, and poor coping habits',
    ],
    correctAnswer: 3,
    explanation:
      "Risk factors such as social isolation, weak support networks, and unhealthy coping habits (e.g., excessive alcohol use) undermine resilience. They reduce a person's capacity to adapt and recover from adversity.",
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 48,
    question: 'Seligman\'s concept of "Learned Optimism" proposes that:',
    options: [
      'Optimistic thinking patterns can be deliberately learned by challenging pessimistic explanatory styles',
      'Some people are born optimistic and others cannot learn it',
      'Optimism is always better than realism in every situation',
      'Pessimistic people are more intelligent than optimistic people',
    ],
    correctAnswer: 0,
    explanation:
      'Seligman demonstrated that optimism is not just an innate trait but a learnable skill. By identifying and challenging pessimistic explanatory styles — how we explain bad events to ourselves — people can develop more resilient, optimistic thinking patterns.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 49,
    question: 'A stress diary is useful for building resilience because it helps a person to:',
    options: [
      'Maintaining a consistent sleep and wake time, even on weekends',
      'Identify patterns, triggers, and the effectiveness of their coping strategies over time',
      'The individual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perception of the event and their perceived ability to cope',
      'It protects recovery time, prevents burnout, and maintains energy for sustained performance over time',
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
      'Identifying your personal early signs of stress (such as disturbed sleep, irritability, or appetite changes) so you can take action before reaching crisis point',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m just not good enough — some people are natural electricians and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not one of them"',
      'Ongoing, consistent maintenance of healthy habits, relationships, and coping strategies — treating wellbeing as a continuous practice, not a destination',
    ],
    correctAnswer: 2,
    explanation:
      'A fixed mindset interprets failure as evidence of permanent, unchangeable inadequacy. The statement "I\'m just not good enough" reflects the belief that ability is innate. A growth mindset would see the failure as a learning opportunity.',
    category: 'Understanding Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 51,
    question: 'Self-assessment of resilience is valuable because it:',
    options: [
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds',
      'A persistent sense that rest and time off no longer restore your energy — you feel tired even after a weekend or holiday',
      'Helps individuals identify their strengths and areas for development, creating a personal baseline',
    ],
    correctAnswer: 3,
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
      'Resilience is developed through experiencing and successfully navigating adversity, not by avoiding it',
      'Assessing whether the situation is irrelevant, benign-positive, or stressful',
      'Assuming you know what your supervisor thinks about you without any evidence — "He thinks I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m useless"',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
    ],
    correctAnswer: 0,
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
      'Purpose, Enjoyment, Rest, Management, Adaptability',
      'Positive Emotion, Engagement, Relationships, Meaning, Accomplishment',
      'Persistence, Empathy, Resilience, Mindfulness, Awareness',
      'Positivity, Energy, Relationships, Motivation, Achievement',
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
      'Blaming yourself entirely for a negative event, even when external factors contributed',
      'Enables people who cannot pay their tax bill in full to negotiate a manageable payment plan, reducing financial stress',
      'Positive psychological change experienced as a result of the struggle with highly challenging life circumstances',
      'Moderate caffeine can improve alertness, but excessive consumption increases anxiety, disrupts sleep, and triggers the stress response',
    ],
    correctAnswer: 2,
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
      'Permanent elimination of negative emotions',
      'Reduced need for social contact',
      'Greater appreciation of life',
    ],
    correctAnswer: 3,
    explanation:
      'The five domains of PTG are: greater appreciation of life, new possibilities, improved relationships, increased personal strength, and spiritual/existential change. Greater appreciation of life — valuing each day more — is one of the most commonly reported.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 56,
    question: 'Seligman\'s "3 Ps" that can hinder recovery from setbacks are:',
    options: [
      'Personalisation, Pervasiveness, and Permanence',
      'Planning, Preparation, and Performance',
      'Pessimism, Procrastination, and Perfectionism',
      'Patience, Persistence, and Positivity',
    ],
    correctAnswer: 0,
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
      'The body releases cortisol and adrenaline, triggering the fight-or-flight response',
      'The stressor is largely outside your control and managing your emotional response is the priority',
      'Emotional regulation — the ability to manage strong feelings under pressure',
      'Assessing whether the situation is irrelevant, benign-positive, or stressful',
    ],
    correctAnswer: 2,
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
      'The widespread nature of stress in the construction industry',
      'A disease that spreads through a population',
      'Believing that a setback in one area of life will undermine all other areas',
    ],
    correctAnswer: 3,
    explanation:
      'Pervasiveness is the thinking trap of allowing one setback to contaminate all areas of life. For example, a difficult day on site leads to thinking "nothing ever goes right for me" rather than containing the problem to its specific context.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 60,
    question: 'The "Permanence" trap in the 3 Ps involves believing that:',
    options: [
      'The negative effects of a setback will last forever and the situation will never improve',
      'Persistent irritability, mood swings, and disproportionate anger',
      'Have a private, non-judgemental conversation expressing genuine concern',
      'Work-related stress manifesting across physical, emotional, and behavioural domains',
    ],
    correctAnswer: 0,
    explanation:
      'Permanence is the thinking trap of believing that current difficulties will never end. "I\'ll always feel this way" or "Things will never get better" are characteristic permanence thoughts that undermine resilience and motivation to act.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 61,
    question: 'Which element of the PERMA model focuses on being fully absorbed in an activity?',
    options: [
      'Positive Emotion',
      'Engagement',
      'Meaning',
      'Accomplishment',
    ],
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
      'Taking practical steps to address or manage the source of the stress directly',
      'A deliberate routine that helps you mentally shift from work mode to personal mode at the end of the day',
      'It enables you to anticipate, prepare for, and manage your responses to known stressors',
      'It reduces the catastrophic impact of unexpected events like illness, redundancy, or gaps between contracts',
    ],
    correctAnswer: 2,
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
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
      'Positive psychological change experienced as a result of the struggle with highly challenging life circumstances',
      'Poor boundary setting that will lead to chronic overwork, quality reduction, and eventual burnout',
      '"This feedback shows me specifically where I can improve — what can I learn from this?"',
    ],
    correctAnswer: 3,
    explanation:
      'A growth mindset welcomes constructive feedback as valuable information for development. Rather than taking it personally (fixed mindset), the individual focuses on what can be learned and how to improve, viewing the feedback as a gift.',
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 64,
    question:
      "Which of Reivich and Shatte's seven resilience abilities involves accurately identifying the causes of problems?",
    options: [
      'Causal analysis',
      'Impulse control',
      'Reaching out',
      'Self-efficacy',
    ],
    correctAnswer: 0,
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
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
      'Involves adaptive flexibility, emotional awareness, and willingness to seek support, not just enduring hardship',
      'The progression from chronic stress into burnout, characterised by emotional exhaustion, loss of engagement, and withdrawal',
    ],
    correctAnswer: 2,
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
      '5.6 weeks (28 days for a 5-day worker), which can include bank holidays',
      'Resilience is developed through experiencing and successfully navigating adversity, not by avoiding it',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
    ],
    correctAnswer: 3,
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
      'When people repeatedly experience uncontrollable negative events, they can learn to believe they are powerless, but this belief can be unlearned',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
      'Is passive and repetitive, focusing on "why" and "what if" without generating actionable steps, whereas problem-solving is active and goal-directed',
    ],
    correctAnswer: 0,
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
      'Persistent irritability, mood swings, and disproportionate anger',
      'Positive acceptance of change and secure relationships',
      'Maintaining a consistent sleep and wake time, even on weekends',
      'Regular exercise, social connection, and adequate sleep',
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
      'Awareness of current experience, gathering attention to the breath, expanding attention to the whole body',
      'Capture a specific situation, the automatic thought, the emotion, the evidence for and against the thought, and a balanced alternative',
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
      'Extended recovery periods such as holidays and annual leave that allow deeper restoration than daily or weekly recovery can achieve',
    ],
    correctAnswer: 2,
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
      'Improved relationships',
      'Greater appreciation of life',
      'New possibilities',
    ],
    correctAnswer: 3,
    explanation:
      'The "new possibilities" domain of PTG describes discovering new interests, directions, or opportunities that emerged specifically because of the struggle with adversity. People often report pursuing new careers, hobbies, or life paths they would not have considered before.',
    category: 'Understanding Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 72,
    question: 'Self-efficacy, as it relates to resilience, is best defined as:',
    options: [
      "A person's belief in their own ability to succeed in specific situations and accomplish tasks",
      "The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built",
      "Mentally disengaging from work-related thoughts and activities, allowing genuine cognitive and emotional recovery",
      "The body attempting to adapt and cope with the ongoing stressor, using significant resources",
    ],
    correctAnswer: 0,
    explanation:
      "Self-efficacy (Bandura, 1977) is the belief in one's capacity to execute behaviours necessary to achieve specific goals. It is a crucial component of resilience because people who believe they can cope are more likely to take effective action under pressure.",
    category: 'Understanding Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 73,
    question:
      "Which of the following is NOT one of Reivich and Shatte's seven resilience abilities?",
    options: [
      'Empathy',
      'Financial planning',
      'Realistic optimism',
      'Impulse control',
    ],
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
      'Impairs cognitive function, concentration, and mood, and increases fatigue and irritability',
      'Believing that a setback in one area of life will undermine all other areas',
      'The willingness to try new experiences, take appropriate risks, and connect with others for support',
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
    ],
    correctAnswer: 2,
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
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
      'Conducting an honest self-assessment of current stress levels, coping strategies, and support networks to establish a baseline',
      'The minimum set of self-care activities you commit to maintaining regardless of how busy or stressed you are',
      'The apprenticeship journey involves constant challenges, setbacks, and skill development that require belief in the ability to improve',
    ],
    correctAnswer: 3,
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
      '"This is a genuinely difficult situation, but I believe I can find a way through it with effort and support"',
      'It indicates workers are pushing through when depleted, reducing productivity, increasing error rates, and delaying genuine recovery',
      'It reduces the catastrophic impact of unexpected events like illness, redundancy, or gaps between contracts',
      'An integrated system where each element supports and reinforces the others, creating a comprehensive framework for long-term mental fitness',
    ],
    correctAnswer: 0,
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
      'University of Massachusetts Medical Centre',
      'Regular exercise, social connection, and adequate sleep',
      'The highest risk of work-related stress and associated illness',
      'Overgeneralisation — drawing a sweeping conclusion from a single event',
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
      'It indicates workers are pushing through when depleted, reducing productivity, increasing error rates, and delaying genuine recovery',
      'Identify patterns, triggers, and the effectiveness of their coping strategies over time',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'The high-stress, physically demanding environment benefits from quick, portable techniques that require no equipment',
    ],
    correctAnswer: 2,
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
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'Potential burnout, disengagement, or avoidant coping across the workforce, warranting investigation into working conditions and stress levels',
      'Time away from family and support networks, disrupted routines, social isolation, and difficulty maintaining healthy habits',
      'Resilience is not a permanent state — it fluctuates with life circumstances and requires ongoing maintenance, regardless of experience',
    ],
    correctAnswer: 3,
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
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
      'Deliberately cultivating relationships across different areas of life — work, family, friends, community — so support is available from multiple sources',
      'A person\\\'s belief in their own ability to succeed in specific situations and accomplish tasks',
    ],
    correctAnswer: 0,
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
      'Personalisation, Pervasiveness, and Permanence',
      'University of Massachusetts Medical Centre',
      'Persistent headaches and muscle tension',
      'Workload, work patterns, and the work environment',
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
      'A religious practice only suitable for monks',
      'Paying attention to the present moment, on purpose, without judgement',
      'A technique for improving memory and recall',
    ],
    correctAnswer: 2,
    explanation:
      'Kabat-Zinn defined mindfulness as "paying attention in a particular way: on purpose, in the present moment, and non-judgementally." It is not about emptying the mind but about noticing thoughts and feelings without getting caught up in them.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 83,
    question: 'Box Breathing (also called square breathing) follows which pattern?',
    options: [
      'Breathe rapidly for 10 seconds then hold breath for 30 seconds',
      'Breathe in for 7 seconds, hold for 4 seconds, breathe out for 8 seconds',
      'Breathe in for 2 seconds, hold for 6 seconds, breathe out for 2 seconds',
      'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds',
    ],
    correctAnswer: 3,
    explanation:
      'Box Breathing follows a 4-4-4-4 pattern: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. This equal-sided pattern activates the parasympathetic nervous system, reducing the stress response quickly and effectively.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 84,
    question: 'The 5-4-3-2-1 Grounding technique involves engaging which senses?',
    options: [
      'Five things you see, four you touch, three you hear, two you smell, one you taste',
      'An occupational phenomenon resulting from chronic workplace stress that has not been successfully managed',
      'A deliberate routine that helps you mentally shift from work mode to personal mode at the end of the day',
      'The negative effects of a setback will last forever and the situation will never improve',
    ],
    correctAnswer: 0,
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
      'It can help with stress, anxiety, and depression',
      'It can be practised in short sessions throughout the day',
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
      'Person-Centred Therapy',
      'Cognitive Behavioural Therapy (CBT)',
      'Eye Movement Desensitisation and Reprocessing (EMDR)',
    ],
    correctAnswer: 2,
    explanation:
      'Beck developed Cognitive Behavioural Therapy (CBT), which is based on the principle that our thoughts (cognitions), feelings, and behaviours are interconnected. By identifying and challenging unhelpful thought patterns, we can change how we feel and behave.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 87,
    question: 'In Ellis\'s ABC Model, what does "B" stand for?',
    options: [
      'Behaviour',
      'Balance',
      'Brain',
      'Beliefs',
    ],
    correctAnswer: 3,
    explanation:
      'In the ABC Model, A is the Activating event, B is the Beliefs about that event, and C is the Consequences (emotional and behavioural). Ellis demonstrated that it is our beliefs about events, not the events themselves, that determine our emotional responses.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 88,
    question: 'Problem-focused coping involves:',
    options: [
      'Taking practical steps to address or manage the source of the stress directly',
      'You must completely empty your mind of all thoughts for it to work',
      'Regular exercise, social connection, and adequate sleep',
      'Difficulty concentrating, racing thoughts, poor memory, and indecisiveness',
    ],
    correctAnswer: 0,
    explanation:
      "Problem-focused coping (Lazarus & Folkman) involves taking direct action to address the stressor: planning, seeking information, making changes, or removing the source of stress. It is most effective when the stressor is within the person's control.",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 89,
    question: 'Emotion-focused coping is most appropriate when:',
    options: [
      'Recovery over evenings and weekends — the daily and weekly recovery periods between work shifts',
      'The stressor is largely outside your control and managing your emotional response is the priority',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'A state of temporary immobility or dissociation when the threat feels inescapable',
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
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      'A wide range of issues including debt, employment rights, benefits, tax, and consumer problems — all free and confidential',
      'Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal',
      'Mentally disengaging from work-related thoughts and activities, allowing genuine cognitive and emotional recovery',
    ],
    correctAnswer: 2,
    explanation:
      'Avoidant coping involves strategies that provide temporary relief but do not address the stressor: excessive alcohol use, denial, withdrawal, procrastination, or distraction. While natural in the short term, persistent avoidant coping prolongs and worsens stress.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 91,
    question: 'The 3-Minute Breathing Space in mindfulness practice consists of which three steps?',
    options: [
      'Positive psychological change experienced as a result of the struggle with highly challenging life circumstances',
      'They may be experiencing significant stress and should be approached with concern',
      'Paying full attention to a routine activity (such as a toolbox talk or tea break) instead of being on autopilot',
      'Awareness of current experience, gathering attention to the breath, expanding attention to the whole body',
    ],
    correctAnswer: 3,
    explanation:
      'The 3-Minute Breathing Space has three phases: (1) awareness — acknowledging current thoughts, feelings, and sensations; (2) gathering — focusing attention narrowly on the breath; (3) expanding — widening attention to the whole body and surroundings.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 92,
    question: 'A Body Scan meditation involves:',
    options: [
      'Systematically directing attention through each part of the body, noticing sensations without trying to change them',
      'Challenge the beliefs (B): \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'ll call ahead, being late once is not a disaster, and \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'always\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' is an exaggeration\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"',
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
    ],
    correctAnswer: 0,
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
      'Replacing all other forms of therapy',
      'Curing all mental health conditions',
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
      'It removes the protective buffer of social support, increases rumination, and reduces opportunities to talk about difficulties',
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Deliberately looking at a situation from a different perspective to change your emotional response to it',
      'An inverted-U curve — performance peaks at moderate arousal then declines',
    ],
    correctAnswer: 2,
    explanation:
      'Cognitive reframing is a CBT technique where you deliberately reinterpret a situation from a different angle. For example, reframing a failed inspection from "I\'m a failure" to "This shows me exactly what I need to study" changes the emotional response from shame to motivation.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 95,
    question: 'In CBT, a "cognitive distortion" is:',
    options: [
      'A flexible combination of both problem-focused and emotion-focused coping, matched to the demands of the situation',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
      'How organisational change, large or small, is managed and communicated',
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
    ],
    correctAnswer: 3,
    explanation:
      'Cognitive distortions are systematic errors in thinking identified by Beck. They include catastrophising, black-and-white thinking, mind reading, and overgeneralisation. These distortions are automatic, feel true, and reinforce negative emotional states.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 96,
    question: 'The cognitive distortion of "catastrophising" involves:',
    options: [
      'Imagining the worst possible outcome and treating it as the most likely outcome',
      'Preparing for a natural disaster as part of emergency planning',
      'Recognising that a situation is genuinely catastrophic',
      'Making an insurance claim for catastrophic damage',
    ],
    correctAnswer: 0,
    explanation:
      'Catastrophising is jumping to the worst possible conclusion and assuming it is the most likely. For example, a small disagreement with a supervisor becomes "I\'m going to get sacked." Challenging this distortion involves assessing the realistic probability of the feared outcome.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 97,
    question: 'A thought record is a CBT tool used to:',
    options: [
      'A persistent sense that rest and time off no longer restore your energy — you feel tired even after a weekend or holiday',
      'Capture a specific situation, the automatic thought, the emotion, the evidence for and against the thought, and a balanced alternative',
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
      'Recovery over evenings and weekends — the daily and weekly recovery periods between work shifts',
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
      'Increased risk-taking and poor concentration leading to safety errors',
      'Evaluating what coping resources and options are available',
      'Overgeneralisation — drawing a sweeping conclusion from a single event',
      'Unacceptable behaviour such as bullying, harassment, and conflict at work',
    ],
    correctAnswer: 2,
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
      'They may be experiencing significant stress and should be approached with concern',
      'The individual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perception of the event and their perceived ability to cope',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m just not good enough — some people are natural electricians and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not one of them"',
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
    ],
    correctAnswer: 3,
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
      'It redirects attention from internal panic to external sensory reality, interrupting the escalation of anxiety',
      'Paying full attention to a routine activity (such as a toolbox talk or tea break) instead of being on autopilot',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
    ],
    correctAnswer: 0,
    explanation:
      'During panic, the mind becomes trapped in an internal loop of catastrophic thoughts. The 5-4-3-2-1 technique forces attention outward to sensory experience, breaking the anxiety cycle. This is why it works well in busy environments — there are plenty of sensory anchors.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 101,
    question: 'Box Breathing is used by military special forces because it:',
    options: [
      'Recovery over evenings and weekends — the daily and weekly recovery periods between work shifts',
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
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
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
      'A person views situations in extreme, absolute terms with no middle ground — everything is either perfect or a complete failure',
      'Acts rapidly for the immediate fight-or-flight response, whereas cortisol sustains the longer-term stress response',
    ],
    correctAnswer: 2,
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
      'Denial — pretending the deadline does not exist',
      'Emotion-focused coping — accepting the situation as it is',
      'Avoidant coping — working longer hours without addressing the root cause',
      'Problem-focused coping — taking practical steps to improve time management',
    ],
    correctAnswer: 3,
    explanation:
      'When a stressor is controllable, problem-focused coping is most effective: identify the cause (poor time management), take action (improve planning, use scheduling tools, delegate). Emotion-focused coping is better suited to stressors outside your control.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 104,
    question: 'The NHS website lists mindfulness as an evidence-based technique for:',
    options: [
      'Improving mental wellbeing and managing stress, anxiety, and low mood',
      'Curing physical illnesses such as cancer',
      'Replacing all medication for depression',
      'Treating only severe psychiatric conditions',
    ],
    correctAnswer: 0,
    explanation:
      'The NHS recognises mindfulness as an evidence-based approach to improve mental wellbeing and manage stress, anxiety, and low mood. It is recommended as a complementary practice, not as a replacement for medical treatment where needed.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 105,
    question: 'A key principle of CBT that makes it practical for construction workers is that it:',
    options: [
      'Resilience is not a permanent state — it fluctuates with life circumstances and requires ongoing maintenance, regardless of experience',
      'Focuses on identifying and changing current thought patterns and behaviours, producing results in a structured timeframe',
      'Examine the evidence: how many inspections have they actually failed versus passed, and what is the realistic worst-case outcome?',
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
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
      "The high-stress, physically demanding environment benefits from quick, portable techniques that require no equipment",
      "Acts rapidly for the immediate fight-or-flight response, whereas cortisol sustains the longer-term stress response",
      "Challenge the beliefs (B): \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I'll call ahead, being late once is not a disaster, and 'always' is an exaggeration\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"",
      "The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built",
    ],
    correctAnswer: 2,
    explanation:
      'The ABC Model targets beliefs. The catastrophising ("go mental," "warning") and overgeneralisation ("always") can be challenged with more balanced thoughts: calling ahead shows responsibility, one late arrival rarely leads to formal action, and "always" is rarely accurate.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 107,
    question: 'Research evidence for mindfulness includes findings that regular practice:',
    options: [
      'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds',
      'A relatively high level of arousal, as the task requires less cognitive effort',
      'Narrow attention to the physical sensation of breathing, creating a focused anchor point',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
    ],
    correctAnswer: 3,
    explanation:
      'Neuroscience research (including studies by Lazar et al. and Hölzel et al.) has shown that regular mindfulness practice is associated with measurable brain changes including increased grey matter in regions associated with emotional regulation, reduced cortisol, and improved immune markers.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 108,
    question: 'A limitation of emotion-focused coping that is important to recognise is:',
    options: [
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
      'It prevents psychological detachment from work, keeping the brain in a state of partial work-mode arousal and inhibiting genuine rest',
    ],
    correctAnswer: 0,
    explanation:
      'While valuable when stressors are uncontrollable, relying solely on emotion-focused coping for controllable problems means the source of stress persists. Effective coping involves matching the strategy to the situation: problem-focused for controllable stressors, emotion-focused for uncontrollable ones.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 109,
    question: 'Cognitive distortion "mind reading" in a construction context might look like:',
    options: [
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'Assuming you know what your supervisor thinks about you without any evidence — "He thinks I\\\'m useless"',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
      'Assessing whether the situation is irrelevant, benign-positive, or stressful',
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
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Avoidant coping, which provides temporary relief but does not address the underlying stressor and creates additional health risks',
      'Time away from family and support networks, disrupted routines, social isolation, and difficulty maintaining healthy habits',
    ],
    correctAnswer: 2,
    explanation:
      'Regular alcohol use to escape stress is avoidant coping. While it provides temporary numbing, it does not resolve the stressor, disrupts sleep quality, impairs next-day performance, and can escalate into dependency — creating a new and serious problem.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 111,
    question: 'The CBT concept of "emotional reasoning" involves:',
    options: [
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'Incorrect — employers have a legal duty under HSWA 1974 and MHSWR 1999 to assess and manage work-related stress risks',
      'Assuming that because you feel something, it must be true — "I feel incompetent, therefore I am incompetent"',
    ],
    correctAnswer: 3,
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
      'Paying full attention to a routine activity (such as a toolbox talk or tea break) instead of being on autopilot',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'Stay with them, listen non-judgementally, and help them contact emergency services (999) or the Samaritans (116 123) — do not leave them alone',
    ],
    correctAnswer: 0,
    explanation:
      'Informal mindfulness means bringing full present-moment attention to activities you are already doing. Paying attention during a toolbox talk, noticing the taste of your tea, or focusing on the physical sensations of walking between tasks all build the mindfulness skill without extra time.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'advanced' as const,
  },
  {
    id: 113,
    question: 'Lazarus and Folkman identified that most effective copers use:',
    options: [
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'A flexible combination of both problem-focused and emotion-focused coping, matched to the demands of the situation',
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
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
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      'Free, confidential debt advice and debt management solutions',
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
    ],
    correctAnswer: 2,
    explanation:
      "In Ellis's ABC Model, consequences encompass both emotional responses (anger, anxiety, sadness) and behavioural responses (withdrawal, aggression, avoidance). Changing beliefs (B) changes both types of consequence simultaneously.",
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'intermediate' as const,
  },
  {
    id: 115,
    question: 'Which of the following is NOT a recognised cognitive distortion in CBT?',
    options: [
      'Alarm, Resistance, Exhaustion',
      'Cognitive Behavioural Therapy (CBT)',
      'The sympathetic nervous system',
      'Realistic assessment of risk',
    ],
    correctAnswer: 3,
    explanation:
      'Realistic assessment of risk is healthy, rational thinking — the opposite of a cognitive distortion. Catastrophising, mind reading, and emotional reasoning are all recognised distortions that CBT aims to identify and challenge.',
    category: 'Coping Strategies & Mindfulness',
    difficulty: 'basic' as const,
  },
  {
    id: 116,
    question: 'The primary purpose of the "gathering" step in the 3-Minute Breathing Space is to:',
    options: [
      'Narrow attention to the physical sensation of breathing, creating a focused anchor point',
      'Social isolation, lack of support networks, and poor coping habits',
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
      'Have a phased return with gradually increasing demands, regular check-ins, and clear boundaries to prevent relapse',
    ],
    correctAnswer: 0,
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
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'Optimistic thinking patterns can be deliberately learned by challenging pessimistic explanatory styles',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
    ],
    correctAnswer: 2,
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
      'Avoidant coping, which provides temporary relief but does not address the underlying stressor and creates additional health risks',
      'It releases endorphins, reduces cortisol, improves sleep, and builds neuroplasticity',
      'Both emotional consequences (how you feel) and behavioural consequences (what you do)',
      'The high-stress, physically demanding environment benefits from quick, portable techniques that require no equipment',
    ],
    correctAnswer: 3,
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
      'Examine the evidence: how many inspections have they actually failed versus passed, and what is the realistic worst-case outcome?',
      'The stressor is largely outside your control and managing your emotional response is the priority',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
      'Focuses on identifying and changing current thought patterns and behaviours, producing results in a structured timeframe',
    ],
    correctAnswer: 0,
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
      'Sleeping in as late as possible whenever you can',
      'Maintaining a consistent sleep and wake time, even on weekends',
      'Drinking alcohol before bed to relax',
    ],
    correctAnswer: 2,
    explanation:
      "Consistent sleep and wake times regulate the circadian rhythm — the body's internal clock. Irregular patterns disrupt this rhythm, making it harder to fall asleep and reducing sleep quality, even if total hours seem adequate.",
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 123,
    question: 'Dehydration on site can contribute to stress because it:',
    options: [
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'It redirects attention from internal panic to external sensory reality, interrupting the escalation of anxiety',
      'Impairs cognitive function, concentration, and mood, and increases fatigue and irritability',
    ],
    correctAnswer: 3,
    explanation:
      'Even mild dehydration (1-2%) impairs concentration, short-term memory, mood, and decision-making. On construction sites, where physical work increases fluid loss, staying hydrated is essential for both safety and mental resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 124,
    question: 'Physical exercise benefits mental resilience through which mechanism?',
    options: [
      'It releases endorphins, reduces cortisol, improves sleep, and builds neuroplasticity',
      'An irrational or exaggerated thought pattern that reinforces negative thinking and emotions',
      'How organisational change, large or small, is managed and communicated',
      '"This feedback shows me specifically where I can improve — what can I learn from this?"',
    ],
    correctAnswer: 0,
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
      'An integrated system where each element supports and reinforces the others, creating a comprehensive framework for long-term mental fitness',
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
      'Short recovery activities taken during the working day, such as brief walks, breathing exercises, or short breaks from a demanding task',
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
      'A flexible combination of both problem-focused and emotion-focused coping, matched to the demands of the situation',
      'Emotional regulation — the ability to manage strong feelings under pressure',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
      'Work-related stress manifesting across physical, emotional, and behavioural domains',
    ],
    correctAnswer: 2,
    explanation:
      'Mates in Mind is a UK charity dedicated to improving mental health in the construction industry. It works with employers to raise awareness, reduce stigma, and build a culture where workers feel able to seek help for mental health difficulties.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 127,
    question: 'The Lighthouse Club provides:',
    options: [
      'Acts rapidly for the immediate fight-or-flight response, whereas cortisol sustains the longer-term stress response',
      'Difficulty concentrating, racing thoughts, poor memory, and indecisiveness',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
      'Financial and emotional support specifically for construction workers and their families',
    ],
    correctAnswer: 3,
    explanation:
      "The Lighthouse Club is the construction industry's charity, providing financial grants, emotional support, and a 24/7 helpline specifically for construction workers and their families. Their helpline number is 0345 605 1956.",
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 128,
    question: 'Social connection is a protective factor for resilience because:',
    options: [
      'Supportive relationships provide emotional support, practical help, a sense of belonging, and buffer against the effects of stress',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Involves adaptive flexibility, emotional awareness, and willingness to seek support, not just enduring hardship',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
    ],
    correctAnswer: 0,
    explanation:
      'Research consistently shows that strong social connections are one of the most powerful protective factors against stress and mental illness. Supportive relationships provide a sense of belonging, practical help, emotional support, and a buffer against adversity.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 129,
    question:
      'Under the Working Time Regulations 1998, the maximum average working week (unless opted out) is:',
    options: [
      '60 hours',
      '48 hours',
      '40 hours',
      '35 hours',
    ],
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
    options: [
      '8 hours',
      '6 hours',
      '11 consecutive hours',
      '12 hours',
    ],
    correctAnswer: 2,
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
      "Assessing whether the situation is irrelevant, benign-positive, or stressful",
      "Places rigid, unrealistic demands on themselves or others — \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"I should never make mistakes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"",
      "Believing that a setback in one area of life will undermine all other areas",
      "Citizens Advice or HMRC's helpline for guidance on CIS and tax obligations",
    ],
    correctAnswer: 3,
    explanation:
      'Citizens Advice provides free, confidential guidance on tax and financial matters. HMRC also offers a dedicated helpline for CIS queries. Financial stress is a major issue for self-employed construction workers, and these services exist to help.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 132,
    question: 'StepChange is a UK charity that provides:',
    options: [
      'Free, confidential debt advice and debt management solutions',
      'Physical fitness programmes with step counting',
      'Staircase design and installation services',
      'Step-by-step construction training',
    ],
    correctAnswer: 0,
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
      'Citizens Advice or HMRC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s helpline for guidance on CIS and tax obligations',
      'It protects recovery time, prevents burnout, and maintains energy for sustained performance over time',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
      'They may be experiencing significant stress and should be approached with concern',
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
      'Mentally disengaging from work-related thoughts and activities, allowing genuine cognitive and emotional recovery',
      'Experiencing positive transformation that takes the person beyond their pre-trauma baseline',
      'Enables people who cannot pay their tax bill in full to negotiate a manageable payment plan, reducing financial stress',
      'Abilities and intelligence can be developed through effort, learning, and persistence',
    ],
    correctAnswer: 2,
    explanation:
      "HMRC's Time to Pay arrangements allow those struggling with tax bills to negotiate affordable monthly payments. For self-employed construction workers facing cash flow difficulties, this can significantly reduce the financial stress that undermines resilience.",
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 135,
    question: 'Energy drinks consumed on site to combat fatigue can undermine resilience because:',
    options: [
      'Identify patterns, triggers, and the effectiveness of their coping strategies over time',
      'Moderate caffeine can improve alertness, but excessive consumption increases anxiety, disrupts sleep, and triggers the stress response',
      'Short recovery activities taken during the working day, such as brief walks, breathing exercises, or short breaks from a demanding task',
      'High caffeine and sugar cause a short-term boost followed by a crash, disrupt sleep, and can increase anxiety and heart rate',
    ],
    correctAnswer: 3,
    explanation:
      'Energy drinks often contain 150-300mg of caffeine and 30-50g of sugar per can. The initial boost is followed by a crash, and excessive caffeine increases anxiety, disrupts sleep, and elevates heart rate — all of which worsen stress and reduce resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 136,
    question: 'Peer support models in construction are effective because:',
    options: [
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'A person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s belief in their own ability to succeed in specific situations and accomplish tasks',
    ],
    correctAnswer: 0,
    explanation:
      'Peer support works because construction workers often relate better to someone who shares their experience. Trained peer supporters (Mental Health First Aiders, for example) bridge the gap between formal services and the informal culture on site.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 137,
    question: 'The minimum annual leave entitlement under the Working Time Regulations 1998 is:',
    options: [
      'Learnable and modifiable, varying over time and context',
      '5.6 weeks (28 days for a 5-day worker), which can include bank holidays',
      'Improving mental wellbeing and managing stress, anxiety, and low mood',
      'Five things you see, four you touch, three you hear, two you smell, one you taste',
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
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'A state of temporary immobility or dissociation when the threat feels inescapable',
      'Job insecurity, fluctuating income, self-employment complexity, CIS tax deductions, and periods between contracts',
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
    ],
    correctAnswer: 2,
    explanation:
      'Construction has high rates of self-employment, meaning income fluctuates with contracts. CIS tax deductions, periods between jobs, tool and vehicle costs, and the complexity of self-assessment create financial stress that directly undermines mental resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 139,
    question: "Building an emergency fund of 3-6 months' expenses supports resilience because:",
    options: [
      'Cynicism, detachment from work, treating colleagues or clients as objects rather than people, and emotional withdrawal',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'They may be experiencing significant stress and should be approached with concern',
      'It reduces the catastrophic impact of unexpected events like illness, redundancy, or gaps between contracts',
    ],
    correctAnswer: 3,
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
      'It suppresses REM (rapid eye movement) sleep, which is essential for emotional processing and memory consolidation',
      'A person views situations in extreme, absolute terms with no middle ground — everything is either perfect or a complete failure',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
    ],
    correctAnswer: 0,
    explanation:
      'Alcohol may speed sleep onset but severely disrupts sleep architecture, particularly REM sleep. REM sleep is essential for emotional processing and memory consolidation. Poor-quality sleep from alcohol use reduces resilience and worsens next-day stress responses.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 141,
    question: 'Nutrition impacts resilience because:',
    options: [
      'The idea that everyone has a finite capacity for stress, and resilience involves both reducing the flow in (stressors) and increasing the flow out (coping strategies)',
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
      'Incorrect — employers have a legal duty under HSWA 1974 and MHSWR 1999 to assess and manage work-related stress risks',
      'Workers are more likely to open up to someone who understands their daily reality than to a formal professional they have never met',
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
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'Paying full attention to a routine activity (such as a toolbox talk or tea break) instead of being on autopilot',
      'Listen without judgement, take it seriously, stay with them, and help them contact a crisis service such as Samaritans (116 123) or 999 if in immediate danger',
      'It suppresses REM (rapid eye movement) sleep, which is essential for emotional processing and memory consolidation',
    ],
    correctAnswer: 2,
    explanation:
      'Suicidal thoughts must always be taken seriously. Listen non-judgementally, ask directly about their safety, stay with them, and help them contact professional support. The Samaritans (116 123) are available 24/7. If there is immediate danger, call 999.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 143,
    question: 'The concept of "saying no" as a resilience skill means:',
    options: [
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
      'Job insecurity, fluctuating income, self-employment complexity, CIS tax deductions, and periods between contracts',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
    ],
    correctAnswer: 3,
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
      'Chronic overwork depletes physical and mental resources, impairs safety, damages relationships, and ultimately reduces overall performance and resilience',
      'The principle that sustained high performance requires deliberate periods of recovery, and neglecting recovery leads to declining performance',
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'A combination of factors including job insecurity, peripatetic working, macho culture inhibiting help-seeking, financial pressures of self-employment, and access to means',
    ],
    correctAnswer: 0,
    explanation:
      'Research shows that sustained overwork beyond 48 hours significantly increases accident risk, impairs cognitive function, damages health, and erodes relationships. The short-term financial gain is offset by long-term costs to health, safety, and wellbeing.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 145,
    question: 'The relationship between caffeine consumption and resilience is that:',
    options: [
      'Identifying your personal early signs of stress (such as disturbed sleep, irritability, or appetite changes) so you can take action before reaching crisis point',
      'Moderate caffeine can improve alertness, but excessive consumption increases anxiety, disrupts sleep, and triggers the stress response',
      'Recognise signs of mental ill-health, provide initial support, and signpost to appropriate professional help',
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
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
      '"I will do Box Breathing for 3 minutes during my lunch break every working day for the next 4 weeks, and track how I feel before and after"',
      'When people repeatedly experience uncontrollable negative events, they can learn to believe they are powerless, but this belief can be unlearned',
      'Potential burnout, disengagement, or avoidant coping across the workforce, warranting investigation into working conditions and stress levels',
      'Resilience is developed through experiencing and successfully navigating adversity, not by avoiding it',
    ],
    correctAnswer: 2,
    explanation:
      'Monday/Friday absence patterns often signal workforce-level stress, burnout, or disengagement rather than individual laziness. A resilience-informed approach investigates root causes (demands, control, support) rather than jumping to disciplinary action.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 147,
    question: 'Sleep hygiene for shift workers or those with early starts should include:',
    options: [
      'Resilience is not a permanent state — it fluctuates with life circumstances and requires ongoing maintenance, regardless of experience',
      'Awareness of current experience, gathering attention to the breath, expanding attention to the whole body',
      'The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built',
      'Darkening the bedroom, limiting screen time before sleep, maintaining routines, and prioritising 7-9 hours even if sleep times are unconventional',
    ],
    correctAnswer: 3,
    explanation:
      'Shift workers and early starters need consistent sleep routines adapted to their schedule. Blackout curtains, reduced screen exposure (blue light), consistent bed/wake times, and protecting 7-9 hours are all important for maintaining cognitive function and resilience.',
    category: 'Building Daily Resilience',
    difficulty: 'advanced' as const,
  },
  {
    id: 148,
    question: 'Citizens Advice can help construction workers with:',
    options: [
      'A wide range of issues including debt, employment rights, benefits, tax, and consumer problems — all free and confidential',
      '"I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m just not good enough — some people are natural electricians and I\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'m not one of them"',
      'It protects recovery time, prevents burnout, and maintains energy for sustained performance over time',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
    ],
    correctAnswer: 0,
    explanation:
      'Citizens Advice provides free, confidential advice on debt, employment rights, benefits, tax, housing, consumer issues, and more. For construction workers facing financial or employment stress, it is an accessible first point of contact.',
    category: 'Building Daily Resilience',
    difficulty: 'basic' as const,
  },
  {
    id: 149,
    question:
      "The Working Time Regulations 1998 provide for a rest break of at least 20 minutes when a worker's daily working time exceeds:",
    options: [
      '4 hours',
      '6 hours',
      '10 hours',
      '8 hours',
    ],
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
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'A pervasive feeling that nothing you do matters, that you are ineffective, and that your work has no value — regardless of actual performance',
      'It removes the protective buffer of social support, increases rumination, and reduces opportunities to talk about difficulties',
      'Cynicism, detachment from work, treating colleagues or clients as objects rather than people, and emotional withdrawal',
    ],
    correctAnswer: 2,
    explanation:
      'Social isolation removes one of the strongest protective factors against stress: social support. Without colleagues to talk to, problems can seem larger, rumination increases, and early warning signs of stress may go unnoticed by others.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 151,
    question: 'A practical step an electrician can take to reduce financial stress is:',
    options: [
      'A person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s belief in their own ability to succeed in specific situations and accomplish tasks',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Ongoing, consistent maintenance of healthy habits, relationships, and coping strategies — treating wellbeing as a continuous practice, not a destination',
      'Setting aside a fixed percentage of each payment for tax, maintaining a simple budget, and building an emergency fund',
    ],
    correctAnswer: 3,
    explanation:
      'Proactive financial management — setting aside tax, budgeting, and building reserves — directly reduces one of the biggest sources of stress for self-employed construction workers. This is problem-focused coping applied to financial wellbeing.',
    category: 'Building Daily Resilience',
    difficulty: 'intermediate' as const,
  },
  {
    id: 152,
    question: 'A Mental Health First Aider on a construction site is trained to:',
    options: [
      'Recognise signs of mental ill-health, provide initial support, and signpost to appropriate professional help',
      'A chronic state of feeling emotionally drained, overwhelmed, and unable to face the emotional demands of work or life',
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
      'Assuming that because you feel something, it must be true — "I feel incompetent, therefore I am incompetent"',
    ],
    correctAnswer: 0,
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
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
      'Reduces the risk of depression by up to 30%, improves sleep, reduces anxiety, and enhances cognitive function',
      'Systematically directing attention through each part of the body, noticing sensations without trying to change them',
      'It enables you to anticipate, prepare for, and manage your responses to known stressors',
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
      'Increased risk-taking and poor concentration leading to safety errors',
      'Time away from family and support networks, disrupted routines, social isolation, and difficulty maintaining healthy habits',
      'Poor boundary setting that will lead to chronic overwork, quality reduction, and eventual burnout',
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
    ],
    correctAnswer: 2,
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
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      'High caffeine and sugar cause a short-term boost followed by a crash, disrupt sleep, and can increase anxiety and heart rate',
      'Time away from family and support networks, disrupted routines, social isolation, and difficulty maintaining healthy habits',
    ],
    correctAnswer: 3,
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
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'Impairs cognitive function, concentration, and mood, and increases fatigue and irritability',
      'The principle that sustained high performance requires deliberate periods of recovery, and neglecting recovery leads to declining performance',
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
    ],
    correctAnswer: 0,
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
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
      'It indicates workers are pushing through when depleted, reducing productivity, increasing error rates, and delaying genuine recovery',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
      'High caffeine and sugar cause a short-term boost followed by a crash, disrupt sleep, and can increase anxiety and heart rate',
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
      'A pervasive feeling that nothing you do matters, that you are ineffective, and that your work has no value — regardless of actual performance',
      'A flexible combination of both problem-focused and emotion-focused coping, matched to the demands of the situation',
      'Ensuring workers look out for each other, notice behavioural changes early, and have someone to talk to regularly',
      'A men\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings',
    ],
    correctAnswer: 2,
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
      'Systematically directing attention through each part of the body, noticing sensations without trying to change them',
      'Raising awareness, addressing stigma, and improving mental health support in the UK construction industry',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'Assess the situation calmly, contact HMRC about Time to Pay if needed, speak to StepChange or Citizens Advice, and adjust spending to essentials',
    ],
    correctAnswer: 3,
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
      'Strong, supportive social relationships',
      'Greater appreciation of life',
      'Demands, Control, and Support',
      'The sympathetic nervous system',
    ],
    correctAnswer: 0,
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
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'The principle that sustained high performance requires deliberate periods of recovery, and neglecting recovery leads to declining performance',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
      'The willingness to try new experiences, take appropriate risks, and connect with others for support',
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
      'The idea that everyone has a finite capacity for stress, and resilience involves both reducing the flow in (stressors) and increasing the flow out (coping strategies)',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
      'Short recovery activities taken during the working day, such as brief walks, breathing exercises, or short breaks from a demanding task',
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
    ],
    correctAnswer: 2,
    explanation:
      'Micro-recovery involves brief (minutes-long) recovery activities within the working day: a short walk, a breathing exercise, a tea break with a colleague, or simply pausing between tasks. These small interventions prevent stress from accumulating throughout the day.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 163,
    question: 'A transition ritual is:',
    options: [
      'It reduces the catastrophic impact of unexpected events like illness, redundancy, or gaps between contracts',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
      'It indicates workers are pushing through when depleted, reducing productivity, increasing error rates, and delaying genuine recovery',
      'A deliberate routine that helps you mentally shift from work mode to personal mode at the end of the day',
    ],
    correctAnswer: 3,
    explanation:
      'Transition rituals help the brain switch from "work mode" to "home mode." Examples include changing clothes, listening to music during the commute, going for a walk, or having a cup of tea. Without this deliberate transition, work thoughts continue to intrude into personal time.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 164,
    question: 'Rumination is:',
    options: [
      'Repetitive, circular thinking about problems, worries, or negative events that does not lead to solutions',
      'The high-stress, physically demanding environment benefits from quick, portable techniques that require no equipment',
      'The body attempting to adapt and cope with the ongoing stressor, using significant resources',
      'Burnout — specifically the depersonalisation and emotional exhaustion dimensions',
    ],
    correctAnswer: 0,
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
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      'Risk factors increase vulnerability to stress and adversity, while protective factors buffer against their negative effects',
    ],
    correctAnswer: 2,
    explanation:
      'Burnout is not just "being very stressed." It is a distinct syndrome involving deep emotional exhaustion, cynical detachment (depersonalisation), and a pervasive sense of ineffectiveness. Recovery from burnout typically takes months, not days.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 167,
    question: 'Digital detox in the context of resilience refers to:',
    options: [
      'It suppresses REM (rapid eye movement) sleep, which is essential for emotional processing and memory consolidation',
      'Job insecurity, fluctuating income, self-employment complexity, CIS tax deductions, and periods between contracts',
      'It releases endorphins, reduces cortisol, improves sleep, and builds neuroplasticity',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
    ],
    correctAnswer: 3,
    explanation:
      'Digital detox means intentionally reducing screen time — particularly social media, work emails, and news — to allow the brain to genuinely rest. Constant digital stimulation prevents recovery and maintains arousal levels that inhibit switching off.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 168,
    question: 'The Samaritans helpline can be reached on:',
    options: [
      '116 123',
      '999',
      '101',
      '111',
    ],
    correctAnswer: 0,
    explanation:
      'The Samaritans are available 24 hours a day, 365 days a year on 116 123 (free from any phone). They provide confidential emotional support for anyone experiencing distress, despair, or suicidal thoughts. The number is free and does not appear on phone bills.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 169,
    question: "Andy's Man Club is:",
    options: [
      "The brain can form new neural pathways and change throughout life, meaning resilience can genuinely be built",
      "A men's mental health charity running free, peer-support talking groups across the UK, meeting on Monday evenings",
      "The apprenticeship journey involves constant challenges, setbacks, and skill development that require belief in the ability to improve",
      "The body releases cortisol and adrenaline, triggering the fight-or-flight response",
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
      '"This is a genuinely difficult situation, but I believe I can find a way through it with effort and support"',
      'Examine the evidence: how many inspections have they actually failed versus passed, and what is the realistic worst-case outcome?',
      'Leads a movement against male suicide, running a helpline (0800 58 58 58) and webchat, available 5pm to midnight every day',
      'The negative effects of a setback will last forever and the situation will never improve',
    ],
    correctAnswer: 2,
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
      'Small, Moderate, Ambitious, Risky, Testing',
      'Strategic, Meaningful, Appropriate, Results-oriented, Trackable',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
    ],
    correctAnswer: 3,
    explanation:
      'SMART goals are Specific (clear and defined), Measurable (you can track progress), Achievable (realistic), Relevant (aligned to your needs), and Time-bound (with a deadline). This framework turns vague intentions into actionable resilience-building commitments.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 172,
    question: 'Personal "resilience non-negotiables" are:',
    options: [
      'The minimum set of self-care activities you commit to maintaining regardless of how busy or stressed you are',
      'Supportive relationships provide emotional support, practical help, a sense of belonging, and buffer against the effects of stress',
      'A hazard is something with the potential to cause harm; a risk is the likelihood of that harm actually occurring, combined with its severity',
      '"I will do Box Breathing for 3 minutes during my lunch break every working day for the next 4 weeks, and track how I feel before and after"',
    ],
    correctAnswer: 0,
    explanation:
      'Resilience non-negotiables are the baseline self-care commitments you protect no matter what: for example, 7 hours of sleep, a daily walk, one phone call to a friend per week. These prevent the downward spiral of abandoning healthy habits when stress increases.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 173,
    question: 'An early warning system for stress involves:',
    options: [
      'Focuses on identifying and changing current thought patterns and behaviours, producing results in a structured timeframe',
      'Identifying your personal early signs of stress (such as disturbed sleep, irritability, or appetite changes) so you can take action before reaching crisis point',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
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
      'Involves adaptive flexibility, emotional awareness, and willingness to seek support, not just enduring hardship',
      'Leads a movement against male suicide, running a helpline (0800 58 58 58) and webchat, available 5pm to midnight every day',
      'Deliberately cultivating relationships across different areas of life — work, family, friends, community — so support is available from multiple sources',
      'The progression from chronic stress into burnout, characterised by emotional exhaustion, loss of engagement, and withdrawal',
    ],
    correctAnswer: 2,
    explanation:
      'A robust support network includes diverse relationships: trusted colleagues, family, friends, community connections, and professional support when needed. Relying on a single person creates vulnerability if that relationship is disrupted.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 175,
    question: 'Meso-recovery refers to:',
    options: [
      'The individual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s perception of the event and their perceived ability to cope',
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Recovery over evenings and weekends — the daily and weekly recovery periods between work shifts',
    ],
    correctAnswer: 3,
    explanation:
      'Meso-recovery describes the recovery that happens between work periods: evenings and weekends. This is where transition rituals, hobbies, social connection, and genuine leisure restore the energy and mental resources depleted during working hours.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 176,
    question: 'Macro-recovery refers to:',
    options: [
      'Extended recovery periods such as holidays and annual leave that allow deeper restoration than daily or weekly recovery can achieve',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
      '"This is a genuinely difficult situation, but I believe I can find a way through it with effort and support"',
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
    ],
    correctAnswer: 0,
    explanation:
      'Macro-recovery involves longer breaks — holidays, extended time off, sabbaticals. These provide deeper restoration that daily and weekly recovery cannot achieve, allowing accumulated fatigue and stress to fully dissipate and resilience reserves to be replenished.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 177,
    question: 'Which technique is most effective for breaking a rumination cycle?',
    options: [
      'A person\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s belief in their own ability to succeed in specific situations and accomplish tasks',
      'Engaging in an absorbing activity that demands attention, such as physical exercise, a hobby, or a mindfulness exercise',
      'It enables you to anticipate, prepare for, and manage your responses to known stressors',
      'The minimum set of self-care activities you commit to maintaining regardless of how busy or stressed you are',
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
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'Assess the situation calmly, contact HMRC about Time to Pay if needed, speak to StepChange or Citizens Advice, and adjust spending to essentials',
      'Cynicism, detachment from work, treating colleagues or clients as objects rather than people, and emotional withdrawal',
      '"I will do Box Breathing for 3 minutes during my lunch break every working day for the next 4 weeks, and track how I feel before and after"',
    ],
    correctAnswer: 2,
    explanation:
      'Depersonalisation in burnout context means developing a cynical, detached attitude towards work and the people in it. An electrician might stop caring about quality, become dismissive of clients, or withdraw emotionally from colleagues. It is a defence mechanism against exhaustion.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 179,
    question: '"Reduced personal accomplishment" in the burnout model means:',
    options: [
      'Listen without judgement, take it seriously, stay with them, and help them contact a crisis service such as Samaritans (116 123) or 999 if in immediate danger',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      'The minimum set of self-care activities you commit to maintaining regardless of how busy or stressed you are',
      'A pervasive feeling that nothing you do matters, that you are ineffective, and that your work has no value — regardless of actual performance',
    ],
    correctAnswer: 3,
    explanation:
      'Reduced personal accomplishment is the subjective feeling of inefficacy — "nothing I do makes a difference." The person may actually be performing adequately but feels fundamentally ineffective. This self-perception further drains motivation and deepens burnout.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 180,
    question: 'A key warning sign that stress is progressing towards burnout is:',
    options: [
      'A persistent sense that rest and time off no longer restore your energy — you feel tired even after a weekend or holiday',
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Poor boundary setting that will lead to chronic overwork, quality reduction, and eventual burnout',
      'Ensuring workers look out for each other, notice behavioural changes early, and have someone to talk to regularly',
    ],
    correctAnswer: 0,
    explanation:
      'When normal recovery stops working — when a weekend or holiday no longer restores energy — this is a critical warning sign. Normal stress responds to rest; approaching burnout means the depletion is too deep for routine recovery to address.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 181,
    question: 'Recovery from clinical burnout typically takes:',
    options: [
      'Emotional regulation — the ability to manage strong feelings under pressure',
      'Several months to over a year, depending on severity and support',
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'Imagining the worst possible outcome and treating it as the most likely outcome',
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
      'Setting aside a fixed percentage of each payment for tax, maintaining a simple budget, and building an emergency fund',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
      'It prevents psychological detachment from work, keeping the brain in a state of partial work-mode arousal and inhibiting genuine rest',
      'The apprenticeship journey involves constant challenges, setbacks, and skill development that require belief in the ability to improve',
    ],
    correctAnswer: 2,
    explanation:
      'Even brief work email checks trigger work-related cognitive activation, preventing genuine psychological detachment. Research shows that the inability to mentally disconnect from work during off-hours is one of the strongest predictors of poor recovery and eventual burnout.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 183,
    question: 'An effective transition ritual for an electrician finishing a shift might be:',
    options: [
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Emergency financial assistance, wellbeing support, career guidance, and legal advice — all available through their 24/7 helpline',
      'Rapidly activates the parasympathetic nervous system, reducing heart rate and restoring calm under extreme pressure',
      'Changing out of work clothes on site, listening to a podcast during the drive, and having a specific routine (such as a cup of tea) upon arriving home',
    ],
    correctAnswer: 3,
    explanation:
      'Effective transition rituals use physical and psychological cues to signal the shift from work to personal life. Changing clothes, a specific drive-time activity, and a home arrival routine all help the brain transition out of work mode.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 184,
    question: 'Signposting in mental health support means:',
    options: [
      'Directing someone to appropriate professional support services, providing names, numbers, and resources relevant to their needs',
      'Chronic overwork depletes physical and mental resources, impairs safety, damages relationships, and ultimately reduces overall performance and resilience',
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
      'The process of adapting well in the face of adversity, trauma, threats, or significant sources of stress',
    ],
    correctAnswer: 0,
    explanation:
      "Signposting means guiding someone towards the right help: providing specific service names, phone numbers, and resources. Good signposting matches the person's needs to the appropriate service (Samaritans for crisis, Lighthouse Club for construction-specific support, GP for clinical concerns).",
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 185,
    question: 'A SMART resilience goal example for a stressed electrician might be:',
    options: [
      'It suppresses REM (rapid eye movement) sleep, which is essential for emotional processing and memory consolidation',
      '"I will do Box Breathing for 3 minutes during my lunch break every working day for the next 4 weeks, and track how I feel before and after"',
      'Involves a fundamental depletion of resources characterised by emotional exhaustion, detachment, and loss of efficacy, often requiring extended recovery',
      'Resilience is developed through experiencing and successfully navigating adversity, not by avoiding it',
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
      'Narrow attention to the physical sensation of breathing, creating a focused anchor point',
      'The negative effects of a setback will last forever and the situation will never improve',
      'Mentally disengaging from work-related thoughts and activities, allowing genuine cognitive and emotional recovery',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
    ],
    correctAnswer: 2,
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
      'Increased risk-taking and poor concentration leading to safety errors',
      'Five things you see, four you touch, three you hear, two you smell, one you taste',
      'The body releases cortisol and adrenaline, triggering the fight-or-flight response',
      'Burnout — specifically the depersonalisation and emotional exhaustion dimensions',
    ],
    correctAnswer: 3,
    explanation:
      'Cynicism about work, indifference to quality, and emotional numbness are hallmark signs of burnout, particularly depersonalisation (cynical detachment) and emotional exhaustion. This pattern warrants immediate attention, not dismissal as normal.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 188,
    question: 'A colleague returning to work after burnout should ideally:',
    options: [
      'Have a phased return with gradually increasing demands, regular check-ins, and clear boundaries to prevent relapse',
      'Cynicism, detachment from work, treating colleagues or clients as objects rather than people, and emotional withdrawal',
      'Recognise signs of mental ill-health, provide initial support, and signpost to appropriate professional help',
      'Places rigid, unrealistic demands on themselves or others — "I should never make mistakes"',
    ],
    correctAnswer: 0,
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
      'It removes the protective buffer of social support, increases rumination, and reduces opportunities to talk about difficulties',
      'Is passive and repetitive, focusing on "why" and "what if" without generating actionable steps, whereas problem-solving is active and goal-directed',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Assertively declining requests that would compromise your health, recovery, or existing commitments, while explaining your reasons',
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
      'Directing someone to appropriate professional support services, providing names, numbers, and resources relevant to their needs',
      'A condition or attribute that reduces the impact of risk and supports positive adaptation',
      'Setting aside a specific, limited time each day (e.g., 15 minutes) to address worries, and postponing worry outside that time',
      'Their beliefs about the event differ, leading to different emotional and behavioural responses',
    ],
    correctAnswer: 2,
    explanation:
      'The worry window technique involves containing rumination to a designated 15-minute slot. When worry intrudes outside this time, it is noted and postponed to the window. This breaks the pattern of all-day rumination and gives the person control over when they engage with worries.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 191,
    question: 'Burnout is formally recognised by the World Health Organisation (WHO) as:',
    options: [
      'Analysing the feedback, identifying weak areas, creating a revision plan, and rebooking the assessment',
      'Believing that a setback in one area of life will undermine all other areas',
      'Depletion of the body\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s resources, leading to burnout, illness, or breakdown',
      'An occupational phenomenon resulting from chronic workplace stress that has not been successfully managed',
    ],
    correctAnswer: 3,
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
      'The progression from chronic stress into burnout, characterised by emotional exhaustion, loss of engagement, and withdrawal',
      'Repetitive, circular thinking about problems, worries, or negative events that does not lead to solutions',
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
    ],
    correctAnswer: 0,
    explanation:
      'The progression from enjoyment to dread, persistent exhaustion despite rest, and increased absence are classic indicators of burnout development. This pattern requires intervention — changes to workload, support, and possibly professional help — not dismissal.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
  {
    id: 193,
    question: 'When creating a personal resilience plan, the first step should be:',
    options: [
      'An integrated system where each element supports and reinforces the others, creating a comprehensive framework for long-term mental fitness',
      'Conducting an honest self-assessment of current stress levels, coping strategies, and support networks to establish a baseline',
      'Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal',
      'Carry out a suitable and sufficient assessment of risks to health and safety, including stress',
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
    options: [
      '0800 58 58 58',
      '116 123',
      '0345 605 1956',
      '999',
    ],
    correctAnswer: 2,
    explanation:
      'The Lighthouse Club helpline is 0345 605 1956, available 24/7 for construction workers and their families. It provides emotional, financial, and practical support. This is distinct from CALM (0800 58 58 58) and Samaritans (116 123).',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'basic' as const,
  },
  {
    id: 195,
    question: 'Sustaining wellbeing over the long term requires:',
    options: [
      'Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal',
      'Treat it as a potential medical emergency — call 999, as stress-related symptoms and cardiac events can present identically',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
      'Ongoing, consistent maintenance of healthy habits, relationships, and coping strategies — treating wellbeing as a continuous practice, not a destination',
    ],
    correctAnswer: 3,
    explanation:
      'Wellbeing is maintained through consistent, ongoing practice — not a one-off fix. Just as physical fitness requires regular exercise, mental fitness requires regular maintenance of healthy habits, social connections, and coping strategies throughout life.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'intermediate' as const,
  },
  {
    id: 196,
    question: 'The concept of "emotional exhaustion" in the Maslach burnout model describes:',
    options: [
      'A chronic state of feeling emotionally drained, overwhelmed, and unable to face the emotional demands of work or life',
      'Consistent, repeated practice of resilient thinking and behaviour over time, which physically strengthens neural pathways',
      'Is passive and repetitive, focusing on "why" and "what if" without generating actionable steps, whereas problem-solving is active and goal-directed',
      'Incorrect — employers have a legal duty under HSWA 1974 and MHSWR 1999 to assess and manage work-related stress risks',
    ],
    correctAnswer: 0,
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
      'Repetitive manual labour often creates physical strain without the cardiovascular and mental health benefits of varied, voluntary exercise',
      'Stay with them, listen non-judgementally, and help them contact emergency services (999) or the Samaritans (116 123) — do not leave them alone',
      'An occupational phenomenon resulting from chronic workplace stress that has not been successfully managed',
      'Is associated with reduced cortisol levels, changes in brain grey matter density, and improved immune function',
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
      'Conducting an honest self-assessment of current stress levels, coping strategies, and support networks to establish a baseline',
      'Changing out of work clothes on site, listening to a podcast during the drive, and having a specific routine (such as a cup of tea) upon arriving home',
      'A written list of your personal early indicators (e.g., sleep disruption, irritability, loss of interest), regular self-check-ins, and a trusted person who can give honest feedback',
      'The apprenticeship journey involves constant challenges, setbacks, and skill development that require belief in the ability to improve',
    ],
    correctAnswer: 2,
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
      'Focuses on identifying and changing current thought patterns and behaviours, producing results in a structured timeframe',
      'Awareness of current experience, gathering attention to the breath, expanding attention to the whole body',
      'Setting aside a fixed percentage of each payment for tax, maintaining a simple budget, and building an emergency fund',
      'An integrated system where each element supports and reinforces the others, creating a comprehensive framework for long-term mental fitness',
    ],
    correctAnswer: 3,
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
      'Select 2-3 SMART resilience non-negotiables, build them into daily routines, regularly review and adjust them, and know who to contact if they need support',
      'The principle that sustained high performance requires deliberate periods of recovery, and neglecting recovery leads to declining performance',
      'Capture a specific situation, the automatic thought, the emotion, the evidence for and against the thought, and a balanced alternative',
      'The brain requires adequate nutrition (including omega-3 fatty acids, B vitamins, and stable blood sugar) to regulate mood and manage stress',
    ],
    correctAnswer: 0,
    explanation:
      'Sustainable change comes from selecting a small number of specific, achievable commitments and integrating them into daily life. Regular review allows adjustment as circumstances change. Knowing support resources ensures help is accessible before crisis point is reached.',
    category: 'Switching Off & Sustaining Wellbeing',
    difficulty: 'advanced' as const,
  },
];

export const getRandomRSMExamQuestions = (count: number): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(rsmQuestionBank, count, rsmCategories);
};
